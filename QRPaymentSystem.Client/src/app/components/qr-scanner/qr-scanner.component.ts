import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/library';
import { debug } from 'debug';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit {
  @Output()
  scannedEvent = new EventEmitter<string>();
  @Output()
  scanningErrorEvent = new EventEmitter<Error>();
  @Output()
  videoDeviceNotFoundEvent = new EventEmitter<void>();
  @Output()
  resetEvent = new EventEmitter<void>();

  private log = debug('app-qr-scanner');

  payload = '';

  scanner: BrowserQRCodeReader;
  selectedDevice: VideoInputDevice;
  availableDevices: VideoInputDevice[];

  scannerHidden = true;
  checked = false;

  constructor() {
    this.scanner = new BrowserQRCodeReader();
    this.log('Scanner contructed: ', this.scanner);
  }

  ngOnInit() {
    this.log('Scanner initialized: ', this.scanner);
    this.scanner.getVideoInputDevices()
      .then((videoInputDevices: VideoInputDevice[]) => {
        if (videoInputDevices.length > 0) {
          this.availableDevices = videoInputDevices;
          this.selectedDevice = videoInputDevices[0];
        } else {
          this.availableDevices = null;
          this.selectedDevice = null;
          this.log('Video device not found.');
          this.videoDeviceNotFoundEvent.emit();
        }
      })
      .catch(error => {
        this.log(error);
      });
  }

  onScan() {
    this.log('Scan initiated');
    if (!this.selectedDevice) {
      alert('No video device available.');
      this.scanningErrorEvent.emit(new Error('No video device available.'));
      return;
    }
    this.scannerHidden = false;
    this.scanner.decodeFromInputVideoDevice(this.selectedDevice.deviceId, 'video')
      .then(result => {
        this.log(result.getText());
        this.payload = result.getText();
        this.scannerHidden = true;
        this.scanner.reset();
        this.scannedEvent.emit(this.payload);
      })
      .catch(error => {
        this.log(error);
        this.payload = '';
        this.scanningErrorEvent.emit(error);
      });
  }

  onScanReset() {
    this.log('Scan reset initiated');
    this.scanner.reset();
    this.payload = '';
    this.scannerHidden = true;
    this.resetEvent.emit();
  }

  onDeviceChange(event) {
    this.log('Device changed: ', event);
    if (!this.scannerHidden) {
      this.onScanReset();
      this.onScan();
    }
  }
}
