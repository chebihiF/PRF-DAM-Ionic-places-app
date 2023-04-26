import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place?: Place;

  constructor(
    private placesService: PlacesService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) { } //IOC

  ngOnInit() {
    this.route.paramMap.subscribe( param => {
      if(!param.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(param.get('placeId')!);
    })
  }

  onBookPlace(){
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {selectedPlace: this.place}
      })
      .then(modelEl => {
        modelEl.present();
      })
  }

}
