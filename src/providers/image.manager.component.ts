import { Injectable, ViewChild, ElementRef, Component, EventEmitter, Input, Output, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { Image } from '../models/image';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import * as resources from '../app/resources'
@Component({
    selector: 'file-upload',
    templateUrl: 'image.manager.html',
    styles: [`img
    {
        width:100%;
    }
    .filesrc{
        margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center;
    }
    .captureCss,.uploadCss {
        width:100%;
    }
    `]
})

@Injectable()
export class ImageManager {

    /**
     * @param Observable<number>
    */
    private progress$: Observable<number>;
    /**
    * @type {number}
    */
    @ViewChild('file') file: ElementRef;
    @ViewChild('captureImage') captureButton: ElementRef;
    @Input() filesrc: any = null;
    @Input() buttonCaption: string = "Upload";
    // images: Array<{ src: String }>;
    private progressObserver: any;
    isMobile: boolean = true;
    captureimage: any;
    @Output() uploadChange = new EventEmitter();
    constructor(private platform: Platform, private _zone: NgZone, public http: Http) {
        if (platform.is("mobileweb") || platform.is("core")) {
            this.isMobile = false;
            this.progress$ = Observable.create(observer => {
                this.progressObserver = observer
            }).share();
        } else {
            this.isMobile = true;
        }
        this.filesrc = resources.url.defaultImagePath;
    }

    triggerClick() {
        // if (this.platform.is("mobileweb") || this.platform.is("core")) {
        this.file.nativeElement.click();
        // } else {
        //     this.uploadOrCapture(true);
        // }
    }

    StoreImage(captureimage: Image): Observable<any> {
        return this.Save(captureimage);
    }

    private Save(captureimage: Image) {
        let response = this.http.post(resources.url.apiImageManagerUrl + "uploadFileBase64", captureimage)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    getAllImages(): Observable<any> {
        let res = this.http.get(resources.url.apiImageManagerUrl + 'getImages')
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    getImages(images: any): Observable<any> {
        let res = this.http.post(resources.url.apiImageManagerUrl + 'getImage', { "name": images })
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    onChange(input) {
        let FileList: FileList = input.target.files || input.srcElement.files;
        try {
            // Create a FileReader
            var reader: any = new FileReader();
            // reader.onload = function (event) { debugger; this.filesrc = event.target.result; };
            // Add an event listener to deal with the file when the reader is complete 
            reader.onloadend = (e) => {
                this.filesrc = e.target.result;
            }
            // reader.addEventListener("load", (event) => {
            //     // Get the event.target.result from the reader (base64 of the image)            
            //     // Push the img src (base64 string) into our array that we display in our html template
            //     this.filesrc = event.target.result;
            // }, false);
            reader.readAsDataURL(FileList[0]);
        } catch (error) {
            console.log(error.name);
        }
        this.uploadChange.emit(FileList);
    }

    uploadOrCapture(isImageCapture, options: any = null) {
        if (isImageCapture) {
            let sourceType = Camera.PictureSourceType.CAMERA;
            options = {
                mediaType: Camera.MediaType.PICTURE,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: sourceType,
                targetWidth: 200,
                quality: 80,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                targetHeight: 200
            }
        } else {
            let sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            options = {
                mediaType: Camera.MediaType.PICTURE,
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: sourceType,
                targetWidth: 200,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetHeight: 200
            }
        }

        Camera.getPicture(options).then((data) => {
            let imagedata = "data:image/jpeg;base64," + data;
            this.filesrc = imagedata;
            this.uploadChange.emit(imagedata);

        }), (err) => {
            alert(err)
        }
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    /**
    * Upload files through XMLHttpRequest
    **/
    uploadFile(url: string, params: string[], files: File[]): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
            let guidList = [];
            for (let i = 0; i < files.length; i++) {
                var newGuid = this.newGuid();
                console.log(newGuid);
                guidList.push({ name: newGuid });
                formData.append("uploads[]", files[i], newGuid);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let xhrResponse = JSON.parse(xhr.response);
                        xhrResponse["guidList"] = guidList;
                        this.filesrc = null;
                        observer.next(xhrResponse);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            // xhr.upload.onprogress = (event) => {
            //     this.progress = Math.round(event.loaded / event.total * 100);
            //     this.progressObserver.next(this.progress);
            // };

            xhr.open('POST', url, true);

            xhr.send(formData);
        });
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}