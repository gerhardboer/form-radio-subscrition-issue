import {Component} from 'angular2/core'
import {NgForm} from "angular2/common";
import {OnInit} from "angular2/core";
import {ControlGroup} from "angular2/common";
import {FormBuilder} from "angular2/common";
import {Control} from "angular2/common";
import {RadioButtonState} from "angular2/common";

@Component({
    selector: 'form-sketch',
    template: `
        <form [ngFormModel]="form" (ngSubmit)="onSubmit()">

            <!-- These throw an event for each radio button on the form when 1 changes -->
            <!-- 4 radio buttons == 4 events -->
            <!-- 5 radio buttons == 5 events -->
            <div class="form-group">
                <input type="radio" name="radios" ngControl="myRadio"/>
                <input type="radio" name="radios" ngControl="myRadio2"/>
                <input type="radio" name="radios" ngControl="myRadio3"/>
                <input type="radio" name="radios" ngControl="myRadio4"/>
            </div>

            <!-- These only throw 1 event when a field changes -->
            <!--<div class="form-group">-->
                <!--<input type="text" name="myText" ngControl="myText"/>-->
                <!--<input type="text" name="myText2" ngControl="myText2"/>-->
                <!--<input type="text" name="myText3" ngControl="myText3"/>-->
                <!--<input type="text" name="myText4" ngControl="myText4"/>-->
            <!--</div>-->

            <p>
                Subcsribe call count: {{ counter }}
            </p>
            <p *ngFor="#log of log">
                {{ log }}
            </p>
        </form>
    `
})
export class FormSketchCmp implements OnInit {

    log = [];
    counter = 0;
    form:ControlGroup;

    constructor(fb:FormBuilder) {
        this.form = fb.group({
            myRadio: new RadioButtonState(false, "Radio"),
            myRadio2: new RadioButtonState(true, "Radio2"),
            myRadio3: new RadioButtonState(false, "Radio3"),
            myRadio4: new RadioButtonState(false, "Radio4")
        });

        //this.form = fb.group({
        //    myText: new Control(""),
        //    myText2: new Control(""),
        //    myText3: new Control(""),
        //    myText4: new Control("")
        //});
    }

    ngOnInit():any {
        this.form.valueChanges
            .subscribe((form) => {
                this.log.push('Event counter: ' + this.counter);
                this.counter++;
            })
    }

}