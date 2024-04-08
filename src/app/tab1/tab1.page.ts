import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../service/candidate.service';
import { Candidate } from 'src/model/candidate';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {
  
  candidates: Candidate[] = [];
  total = 0;

  constructor(private dataService: CandidateService) {}

  ngOnInit() {
    // Use the appropriate method based on your chosen data sharing mechanism
    this.dataService.candidates$.subscribe(candidates => this.candidates = candidates); // For Ionic State
    // this.dataService.dataEmitter.subscribe(data => this.values = data); // For Event Emitters
  } 

  onClick(id:string){
    var candidate = this.candidates.find((candidate)=> candidate.id === id );
    if (candidate){
      candidate.votes = candidate.votes+1;
      this.total = this.total+1;
    }
  }

  onReset(){
    this.candidates.forEach(candidate => {
      candidate.votes = 0;
    });
    this.total = 0;
  }

}
