import { Component } from '@angular/core';
import { Candidate } from 'src/model/candidate';
import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  candidateResults: Candidate[] = [];
  candidateTotals: Candidate[] = [];
  total:number = 0;
  //
  winnerId: string = 'maduro';
  hasVerify = false;
  showCandidates = false;
  showTotals = false;

  constructor(private dataService: CandidateService) {}

  ngOnInit() {
    // get candidates votes
    this.dataService.candidates$.subscribe((candidates) => {
      this.candidateResults = candidates;
    }); 
  }

  onToogleVerify(){
    this.hasVerify = !this.hasVerify;
  }

  onClean() {
    this.showCandidates = false;
    this.showTotals = false;
  }

  onPrint() {
    var self = this;
    this.showTotals = true;
    this.showCandidates = false; // this is the flag for the tramp
    var winnerReal: Candidate  = new Candidate();
    var winnerFake: Candidate = new Candidate();
    //build totals
    var totals: Candidate[] = [];
    //
    this.total = 0;
    this.candidateResults.forEach(function (candidate) {
      var clone = new Candidate();
      clone.id = candidate.id;
      clone.name = candidate.name;
      clone.votes = candidate.votes;
      totals.push(clone);
      if (null == winnerReal) winnerReal = clone;
      if (winnerReal.votes < clone.votes) winnerReal = clone;
      if (clone.id === self.winnerId) winnerFake = clone;
    });
    this.candidateTotals = totals;
    for(var i=0; i<this.candidateResults.length; i++){
      this.total = this.total + this.candidateResults[i].votes;
    }
    if (
      false == this.hasVerify &&
      this.total >= 20 &&
      winnerReal.id !== "" &&
      winnerReal.id !== winnerFake.id
    ) {
      //change result to make the our fake winner always win
      var votesFake: number = winnerFake.votes;
      var votesReal: number = winnerReal.votes;
      var total80: number = this.total * 0.8;
      // while not more that 80% of the votes, then move votes to our winners
      while (votesFake + votesReal < total80) {
        totals.forEach(function (candidateResult) {
          if (
            candidateResult.id !== winnerFake.id &&
            candidateResult.id !== winnerReal.id &&
            candidateResult.votes > 2
          ) {
            votesReal++;
            votesFake++;
            candidateResult.votes = candidateResult.votes - 2;
          }
        });
      }
      winnerFake.votes = votesReal;
      winnerReal.votes = votesFake;
      this.showCandidates = true;
    }
  }
}
