import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Candidate } from 'src/model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private candidatesSubject = new BehaviorSubject<Candidate[]>([]);
  candidates$ = this.candidatesSubject.asObservable();

  constructor() {
    var candidateResults    :Candidate[] = [];
    var machado:Candidate = new Candidate();
    machado.id = "machado";
    machado.name = "Maria Corina/Corina Yoris";
    machado.pictureURL = "assets/icon/foto_machado.png"
    candidateResults.push(machado);
    var maduro:Candidate = new Candidate();
    maduro.id = "maduro";
    maduro.name = "Nicolas Maduro";
    maduro.pictureURL = "assets/icon/foto_maduro.png"
    candidateResults.push(maduro);
    var maria:Candidate = new Candidate();
    maria.id = "maria";
    maria.name = "Maria Bolivar";
    maria.pictureURL = "assets/icon/foto_bolivar.png"
    candidateResults.push(maria);
    var nulo:Candidate = new Candidate();
    nulo.id = "nulo";
    nulo.name = "Voto Nulo";
    nulo.pictureURL = "assets/icon/foto_nulo.png"    
    candidateResults.push(nulo);
    this.setCandidates(candidateResults);
  }

  setCandidates(candidates: Candidate[]) {
    this.candidatesSubject.next(candidates);
  }
}