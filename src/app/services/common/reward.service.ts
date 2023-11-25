import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {Reward} from '../../interfaces/common/reward.interface';

const API_SHOP_INFO = environment.apiBaseLink + '/api/reward/';


@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addReward
   * insertManyReward
   * getAllRewards
   * getRewardById
   * updateRewardById
   * updateMultipleRewardById
   * deleteRewardById
   * deleteMultipleRewardById
   */

  addReward(data: Reward) {
    return this.httpClient.post<ResponsePayload>
    (API_SHOP_INFO + 'add', data);
  }


  getReward(select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Reward, message: string, success: boolean }>(API_SHOP_INFO + 'get', {params});
  }



}
