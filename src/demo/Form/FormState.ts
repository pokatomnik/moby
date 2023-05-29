import { reactState } from '../../lib/MobYState';
import { Store } from '../../lib/MobYState/Store';

export class FormState extends Store {
  private readonly formShown = reactState(false);

  private readonly firstName = reactState('');

  private readonly lastName = reactState('');

  private readonly email = reactState('');

  public override get data() {
    return {
      formShown: this.formShown.use(),
      firstName: this.firstName.use(),
      lastName: this.lastName.use(),
      email: this.email.use(),
    };
  }

  public override get methods() {
    return {
      setFormShown: (shown: boolean) => {
        this.formShown.value = shown;
      },
      setFirstName: (firstName: string) => {
        this.firstName.value = firstName;
      },
      setLastName: (lastName: string) => {
        this.lastName.value = lastName;
      },
      setEmail: (email: string) => {
        this.email.value = email;
      },
      submit: () => {
        alert(
          `First Name: ${this.firstName.value};\nLastName: ${this.lastName.value};\nEmail: ${this.email.value}`
        );
      },
    };
  }
}
