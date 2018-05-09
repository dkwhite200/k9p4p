import { Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-edit-item',
    templateUrl: '../edit-item/edit-item.component.html',
    styleUrls: ['../edit-item/edit-item.component.css']
})    
export class EditItemComponent {

    constructor (private activeModal: NgbActiveModal, private itemService: ItemService) { }

    //pulls in item data from items page, and uses formData for 2 way data binding.
    //This allows changes on the edit view without changes on details view.
    @Input() item; formData;
    
    //sets item obj equal to formData and updates database
    onSubmit () {
        if (this.formData.qty < 0) { this.formData.qty = 0; }
        this.item = this.formData;
        //update with item service
        this.itemService.updateItem(this.item);
        //close the modal
        this.activeModal.close('Close click');
    }
}  