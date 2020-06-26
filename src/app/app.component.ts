import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pf-test';
  rulesForm: FormGroup = new FormGroup({
    inclusionRules: new FormArray([]),
    exclusionRules: new FormArray([])
  })
  saveDisabled: boolean;

  saveRules() {
    if (this.rulesForm.valid) {
      const values = this.rulesForm.value;
      const data = [
        ...values.inclusionRules.map(rule => {
          return {
            type: 'whitelist',
            match_type: rule.matchType === 'all_pages' ? 'all_pages' : rule.extraSelect, 
            match_input: rule.matchType === 'all_pages' ? null : rule.matchInput 
          }
        }),
        ...values.exclusionRules.map(rule => {
          return {
            type: 'blacklist',
            match_type: rule.matchType === 'all_pages' ? 'all_pages' : rule.extraSelect, 
            match_input: rule.matchType === 'all_pages' ? null : rule.matchInput 
          }
        })
      ]
      console.log(data);
    } else {
      this.rulesForm.markAllAsTouched();
    }
  }
}
