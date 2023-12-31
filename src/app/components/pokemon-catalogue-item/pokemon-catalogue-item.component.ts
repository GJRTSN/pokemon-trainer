import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-catalogue-item',
  templateUrl: './pokemon-catalogue-item.component.html',
  styleUrls: ['./pokemon-catalogue-item.component.scss'],
})
export class PokemonCatalogueItemComponent {
  @Input() pokemon!: Pokemon;
  @Output() collect = new EventEmitter<Pokemon>();
  collected = false;

  onCollect() {
    this.collected = true;
    setTimeout(() => {
      this.collect.emit(this.pokemon);
      this.collected = false;
    }, 2000);
  }
}
