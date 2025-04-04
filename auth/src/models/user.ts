import mongoose from 'mongoose';
import { Password } from '../services/password';

// Interface describes the properties that are required to crate a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface describes the properties that a user Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface describes the properties that a user Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id; // add une propriété `id` en copiant `_id`
        delete ret._id; // delete `_id`
        delete ret.password; // delete `password`
        delete ret.__v; // delete `__v` (version du document MongoDB)
      },
    },
  }
);

// middleware Mongoose pre('save') sert à hasher le mot de passe avant de l’enregistrer.
userSchema.pre('save', async function (next) {
  // this.isModified('password') vérifie si le champ password a été modifié.
  if (this.isModified('password')) {
    // On récupère le mot de passe actuel avec this.get('password').
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  next();
});

userSchema.statics.build = //  permet d'ajouter des méthodes statiques à un modèle ici build
  (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

// ✅ statics.build permet :
// ✔️ Un meilleur typage avec TypeScript
// ✔️ Une validation plus stricte dès la création
// ✔️ Une meilleure maintenabilité du code
// ✔️ Un code plus lisible et clair

// C’est une bonne pratique en Mongoose + TypeScript pour rendre la création d’objets plus robuste et éviter les erreurs cachées. 🚀

// schema.pre() permet :
// Modifier des données avant de les enregistrer (ex: hasher un mot de passe).
// ✅ Effectuer des validations personnalisées.
// ✅ Déclencher des actions spécifiques (ex: envoyer un e-mail après un save).
