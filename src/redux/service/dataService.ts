import { response } from "express";
import { getRecords } from "../../axios/axios-http";
import http from "../../axios/axios-interceptor";
import { Dish } from "../../core/model/dish.model";

export class DataService {
  public async postComment(payload: any) {
    try {
      const response = await http.post("/sobjects/Comment__c", payload);
      if (response.statusText === "Created") {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        throw error;
      }
    } catch (error) {
      const err = new Error("Error " + error);
      console.log("post comments", err.message);
    }
  }

  public async fetchDishes(): Promise<boolean | Dish[]> {
    try {
      const response = await getRecords(
        "/query/?q=SELECT+Id,id__c,Name__c,image__c,category__c,label__c,price__c,featured__c,description__c+from+dishes__c"
      );
      return this.dishConvertToModelType(response);
    } catch (error) {
      console.log("FetchDishes Error : ", error);
      return false;
    }
  }

  private dishConvertToModelType(res: Array<any>): Array<Dish> {
    let list: Array<Dish> = [];
    res.forEach((element) => {
      list.push({
        id: element.id__c,
        name: element.Name__c,
        image: element.image__c,
        category: element.category__c,
        label: element.label__c,
        price: element.price__c,
        featured: element.featured__c,
        description: element.description__c,
      });
    });
    return list;
  }
}
