import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-rule-form-group',
  templateUrl: './rule-form-group.component.html',
  styleUrls: ['./rule-form-group.component.scss']
})
export class RuleFormGroupComponent implements OnInit {
  @Input('firstAll') firstAll: boolean = false;
  rules: any;
  matchTypeOptions: Array<{value: string, label: string}> = [
    {
      value: 'all_pages',
      label: 'All Pages'
    },
    {
      value: '_custom',
      label: 'Custom'
    }
  ];
  extraSelectOptions: Array<{value: string, label: string}> = [
    {
      value: 'contains',
      label: 'Contains'
    },
    {
      value: 'exact_match',
      label: 'Exact Match'
    }
  ];
  private defaultMatchType: string;
  private defaultExtraSelect: string = 'contains';
  private defaultCustomFieldsDisabled: boolean;
  private matchInputValidators = [
    Validators.required,
    Validators.maxLength(100)
  ]
  private urlValidator = Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.rules = this.controlContainer.control;
    if (this.firstAll) {
      this.defaultMatchType = 'all_pages';
      this.defaultCustomFieldsDisabled = true;
    } else {
      this.defaultMatchType = '_custom';
      this.defaultCustomFieldsDisabled = false;
    }
  }

  addRule(): void {
    this.rules.push(
      new FormGroup({
        matchType: new FormControl(this.defaultMatchType),
        extraSelect: new FormControl({
          value: this.defaultExtraSelect,
          disabled: this.defaultCustomFieldsDisabled
        }),
        matchInput: new FormControl({
          value: '',
          disabled: this.defaultCustomFieldsDisabled,
        }, this.matchInputValidators),
      })
    )
    this.defaultMatchType = '_custom';
    this.defaultCustomFieldsDisabled = false;
  }

  delRule(i: number): void {
    this.rules.removeAt(i);
  }

  changeMatchType(i: number): void {
    if (this.rules.value[i].matchType === 'all_pages') {
      this.rules.controls[i].get('extraSelect').disable()
      this.rules.controls[i].get('matchInput').disable()
    } else {
      this.rules.controls[i].get('extraSelect').enable()
      this.rules.controls[i].get('matchInput').enable()

    }
  }

  changeExtraSelect(i: number): void {
    if (this.rules.value[i].extraSelect === 'exact_match') {
      this.rules.controls[i].get('matchInput').setValidators([this.urlValidator, ...this.matchInputValidators]);
      this.rules.controls[i].get('matchInput').updateValueAndValidity();
    } else {
      this.rules.controls[i].get('matchInput').setValidators(this.matchInputValidators);
      this.rules.controls[i].get('matchInput').updateValueAndValidity();
    }
  }
}
