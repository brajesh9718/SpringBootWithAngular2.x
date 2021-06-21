import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators {
  static cannotContainSpaces(
    control: AbstractControl
  ): ValidationErrors | null {
    if ((control.value as string).indexOf(" ") >= 0) {
      return {
        cannotContainSpace: true,
      };
    }
    return null;
  }

  static usernameShouldBeUnique(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      //async operation
      setTimeout(() => {
        if ((control.value as String) == "varun") {
          return resolve({
            shouldBeUnique: true,
          });
        }
        return resolve(null);
      }, 2000);
    });
  }
}
