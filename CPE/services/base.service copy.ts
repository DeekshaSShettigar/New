import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

interface NetaResponse {
  status: string;
  msg: any;
}

@Injectable({providedIn: 'root'})
export class BaseRequestService {
  currentSite: any; currentCompany: any;
  companyId = '5c8f1d594e3a5b2289efc3da';
  resources = {};
  vendorLogo = ['2n.svg', 'camio.png', '3com.png', '4rf.png', 'a10.png', 'accedian.png', 'adtran.png', 'adva.svg', 'aerohive.svg', 'akcp.png', 'alcatellucent.svg', 'alcoma-almp.png', 'alliedtelesis.svg', 'allworx.svg', 'alpha.png', 'alpine.png', 'alvarion.png', 'amazon.svg', 'apc.svg', 'apple.svg', 'arbor.png', 'arch.svg', 'areca.png', 'arista.svg', 'arraynetworks.png', 'arris.svg', 'aruba.svg', 'asuswrt-merlin.png', 'atal.png', 'audiocodes.png', 'avaya.svg', 'avocent.svg', 'avtech.svg', 'axis.svg', 'barracuda.svg', 'bdcom.svg', 'benuos.png', 'bintec.png', 'bluecoat.png', 'bnt.png', 'broadcom.svg', 'brocade.svg', 'brother.svg', 'buffalo.svg', 'ca.png', 'calix.svg', 'cambium.svg', 'camio.png', 'canon.svg', 'carel.png', 'ccpower.png', 'centos.svg', 'ceragon.png', 'chatsworth.png', 'checkpoint.png', 'ciena.svg', 'cisco-old.png', 'cisco.svg', 'citrix.svg', 'comet.png', 'comtrol.png', 'conexant.png', 'coreos.svg', 'corero.png', 'coriant.svg', 'cradlepoint.png', 'ctcu.svg', 'ctm.png', 'cumulus.png', 'cxr-networks.png', 'cyberoam.png', 'cyberpower.svg', 'dahua.png', 'dasan.png', 'datacom.png', 'dcn.png', 'dd-wrt.png', 'ddn.png', 'debian.svg', 'deliberant.png', 'dell.svg', 'delta.png', 'develop.png', 'devuan.svg', 'digipower.png', 'dlink.png', 'dlink.svg', 'dpstelecom.png', 'dragonfly.svg', 'dragonwave.png', 'draytek.svg', 'eaton.svg', 'edge-core.png', 'edgecore.png', 'edgeos.svg', 'eip.png', 'eltek.png', 'eltex.png', 'emc.svg', 'emerson.svg', 'endian.png', 'engenius.png', 'enlogic.png', 'enterasys.svg', 'epson.svg', 'ericsson.svg', 'etherwan.png', 'exalt.png', 'exinda.png', 'exterity.svg', 'extrahop.png', 'extreme.svg', 'extremeboss.svg', 'extremevoss.svg', 'f5.svg', 'fedora.svg', 'fiberhome.svg', 'firebrick.svg', 'force10.svg', 'fortinet.svg', 'foundry.png', 'freebsd.svg', 'fujitsu.svg', 'gamatronicups.png', 'gandi.png', 'ge.svg', 'geist.png', 'generex-ups.svg', 'generic.svg', 'gentoo.svg', 'glassway.svg', 'gude.png', 'halon.svg', 'hanwhatechwin.svg', 'hds.svg', 'hikvision.png', 'hillstone.svg', 'himoinsa.svg', 'hirschmann.svg', 'hp.svg', 'hpe.svg', 'huawei.svg', 'hwg-poseidon.png', 'hwg.svg', 'hytera.png', 'ibmos.svg', 'ict.png', 'ignitenet.png', 'infoblox.svg', 'ingrasys.png', 'junos.png', 'kemp.png', 'konica.svg', 'kti.svg', 'kyocera.svg', 'lancom.png', 'lanier.png', 'lantronix.svg', 'lenovo.svg', 'lexmark.svg', 'ligowave.png', 'linksys.png', 'linux.svg', 'logmaster.png', 'maipu.png', 'mandrake.png', 'marathonups.png', 'mcafee.png', 'meinberg.svg', 'mellanox.png', 'meraki.png', 'mge.png', 'microsemi.png', 'mikrotik.svg', 'mimosa.svg', 'minkelsrms.png', 'mirth.png', 'mitsubishi.svg', 'monowall.png', 'moxa.svg', 'mrv.png', 'msl.svg', 'nec.svg', 'netapp.svg', 'netbotz.png', 'netbsd.svg', 'netgear.svg', 'netmanplus.png', 'netmodule.png', 'netonix.svg', 'netopia.png', 'netping.svg', 'netvision.png', 'nimble.svg', 'nokia.svg', 'novell.svg', 'nrg.png', 'oki.svg', 'omnitron.png', 'open-e.svg', 'openaccess.png', 'openbsd.svg', 'opengear.svg', 'openindiana.png', 'opensolaris.png', 'opensuse.svg', 'openwrt.svg', 'opnsense.png', 'oracle.svg', 'packetflux.png', 'panos.svg', 'papouch-tme.png', 'pbi.png', 'pbn.png', 'perle.png', 'pfsense.svg', 'phybridge.svg', 'ping.svg', 'planet.png', 'powercode.png', 'powerwalker.png', 'procera.png', 'proxim.png', 'proxmox.svg', 'pulse.png', 'qnap.svg', 'quanta.svg', 'radlan.png', 'radware.svg', 'radwin.svg', 'raisecom.png', 'raritan.svg', 'raspbian.svg', 'ray.png', 'redhat.svg', 'ricoh.svg', 'rittal.svg', 'riverbed.png', 'rockstor.svg', 'ruckus.svg', 'saf.png', 'samsungprinter.svg', 'savin.svg', 'schneider.svg', 'screenos.png', 'servertech.png', 'sharp.png', 'siae.png', 'siemens.svg', 'siklu.png', 'siteboss.png', 'sixnet.png', 'slackware.png', 'smartoptics.png', 'snom.svg', 'solaris.svg', 'sonicwall.svg', 'sonus.png', 'sophos.png', 'speedtouch.png', 'stormshield.svg', 'sub10.png', 'supermicro.png', 'suse.png', 'symbol.png', 'synology.svg', 'tandberg.svg', 'technicolor.svg', 'tegile.svg', 'telco-systems.png', 'teleste.png', 'teradici.png', 'terra.svg', 'tomato.png', 'toshiba.svg', 'tplink.svg', 'trango.png', 'tranzeo.png', 'tripplite.svg', 'tsc.png', 'tyconsystems.png', 'ubiquiti.svg', 'ubuntu.svg', 'uniflair.png', 'vanguard.png', 'vertiv.png', 'viprinux.png', 'vivotek.svg', 'vmware.svg', 'voswall.png', 'vubiq.png', 'vyatta.png', 'vyos.png', 'watchguard.svg', 'waystream.svg', 'windows.svg', 'wti.svg', 'wxgoos.png', 'xerox.svg', 'xirrus.png', 'zebra.svg', 'zhone.png', 'zte.svg', 'zyxel.svg'];
  overlayLoadingTemplate =
    '<span class="">' +
    '<i class="fa fa-spinner fa-spin"></i> Please wait while your rows are loading</span>';
  constructor(readonly httpClient: HttpClient) {
    this.getResourcesData();
  }

  public upload(url, data) {
    return this.httpClient.post<any>(url, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public getResourcesData() {
    this.doRequest('/assets/text/en-US/strings.json', 'get').subscribe(data => {
      this.resources = data;
    });
    /*this.httpClient.get('./assets/text/en-US/strings.json').subscribe(data => {
      this.resources = data;
    });*/
  }
  public setCurrentCompany (companyId) {
    this.companyId = companyId;
  }
  public nonce () {
      let val = '';
      const hex = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 16; i++) { val += hex.charAt(Math.floor(Math.random() * hex.length)); }
      return val;
  }

  public unsafePublish(topic: string, message: string): void {
    // this._mqttService.unsafePublish(topic, message, {qos: 0, retain: false});
  }

  toHttpParams(obj) {
    const params = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (val !== null && val !== undefined) {
          if (typeof val === 'object') {
            params[key] = JSON.stringify(val);
          } else {
            params[key] = val.toString();
          }
        }
      }
    }
    return params;
  }

  deleteRequest(endPointUrl: string) {
    return this.httpClient.delete<NetaResponse>(`${endPointUrl}`).pipe(map(response => this.handleResponse(response)));
  }

  doRequest(endPointUrl: string,
            method: string,
            data?: any,
            params?: any,
            headers?: HttpHeaders, hashOptions?: any) {
    const httpOptions = {
      headers: headers
        ? headers
        : new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      body: JSON.stringify(data),
      params: params,
    };
    if (params) {
      httpOptions.params = new HttpParams({
          fromObject: this.toHttpParams(params)
        }
      );
    }
    httpOptions.headers['hashOptions'] = hashOptions ? hashOptions : {'isLoading': false};
    return this.httpClient
      .request<NetaResponse>(method, `${endPointUrl}`, httpOptions)
      .pipe(
        map(response => this.handleResponse(response))
      );
  }
  getSnakeCaseName(camelCase) {
      return camelCase.replace( /([A-Z])/g, '_$1').toLowerCase().replace(/^_(.*)/g, '$1');
  }

  private handleResponse(response: NetaResponse) {
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
