import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie/movie.service';
declare var $: any;

@Component({
  selector: 'custom-select-box',
  templateUrl: './custom-select-box.component.html',
  styleUrls: ['./custom-select-box.component.scss']
})
export class CustomSelectBoxComponent implements OnInit {

    @Input() dataSource: any[];
    @Input() displayExpr: string;
    @Input() valueExpr: string;
    @Input() movies: number;
    @Input() loadingMessage: string;
    @Output() input = new EventEmitter<any>();
    @Output() searchable = new EventEmitter<string>();
    @Output() newDataSource = new EventEmitter<any[]>();
    selectedOption: string;
    @Input() itemName: string;
    @Input() value: string;
    @Input() validationRules: any[];
    warning: boolean;
    touched: boolean;
    req: boolean;
    searchSelections: any[];
    mainOptions: DataItem[];
    brokenRuleMessage: string;
  
    cityPattern = "^[^0-9]+$";
    openSelectBox: boolean;

    constructor(private movieService: MovieService) {
        this.openSelectBox = false;
        this.selectedOption = "";
        this.brokenRuleMessage = "";
        this.touched = false;
        this.warning = false;
        this.mainOptions = [];
        this.movies = 0;

        this.req = false;
    }

    elementTouched() {
        if (!this.touched) 
            this.touched = true;

        this.openSelectBox = !this.openSelectBox;
    }

    ngOnInit() {
        if (this.dataSource != undefined) {
            // console.log(this.dataSource)
            this.setSelectBoxDisplay(this.valueExpr, this.displayExpr);
            this.dataSource.forEach(item => {
                if (item[this.valueExpr] == this.value) {
                    this.selectedOption = item[this.displayExpr];
                }
            });
        }
    }

    setSelectBoxDisplay(valueExpr: string, displayExpr: string) {
        // console.log(this.valueExpr, this.displayExpr)
        this.dataSource.forEach(item => {
            let di = new DataItem();
            di.value = new Values();
            di.dis = new Displayables();
            di.value.valueExpr = item[valueExpr];
            di.dis.displayExpr = item[displayExpr];
            // console.log(item)
            this.mainOptions.push(di);
        })
        this.searchSelections = this.mainOptions
        // console.log(this.mainOptions)
    }

    changeValue(val) {
        // console.log(val.dis.displayExpr)
        this.selectedOption = val.dis.displayExpr;
        this.input.emit(val.value.valueExpr);
        this.openSelectBox = false;
    }

    allMovies: Movie[];

    search() {
        // console.log(this.selectedOption)
        this.searchable.emit(this.selectedOption.toLocaleLowerCase())
        this.searchSelections = [];
        this.allMovies = []
        this.mainOptions.forEach(item => {
            if (item.dis.displayExpr.toLocaleLowerCase().includes(this.selectedOption.toLocaleLowerCase())) {
                this.searchSelections.push(item);
            }
        })
        this.newDataSource.emit(this.searchSelections)
    }

    dropdown() {
        // console.log('clicked')

        var menu = $('.dropdown-content-custom');

        //if (menu.is(":visible")) {
        //    $("#dropdown").fadeOut();
        //}

        $('.textBox').on('click', function (e) {
            if (!menu.is(":visible")) {
                // console.log('textbox clicked')
                menu.show();
            }
        });

        $('.arrow').on('click', function (e) {
            if (!menu.is(":visible")) {
                // console.log('arrow clicked')
                menu.show();
                e.stopPropagation();
            }
        })

        $(document).on('click', function (e) {
            if (menu.is(":visible") && (!$(e.target).is('.textBox') || $(e.target).is(".arrow"))) {
                menu.hide();
                // console.log('fadeout')
                //console.log(e.target)
            }
        });


    }
}


export class Values {
    [id: string]: any;
}
export class Displayables {
    [name: string]: any;
}
export class DataItem {
    value: Values;
    dis: Displayables;
}