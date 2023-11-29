import {IGenericRepository} from "@/domain/abstracts";
import c from "./constants";

export class APIGenericRepository<T> implements IGenericRepository<T> {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    async getAll(): Promise<T[]> {
        let defaultOptions = {
            url: "",
            method: "GET",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
            },
            // cache: false,
            dataType: "json",
        } as RequestInit;

        let response = await fetch(c.BASE_URL + "/clients/", defaultOptions);
        return response.json();
    }

    async get(id: any): Promise<any> {
        let response = await fetch(c.BASE_URL + "/clients/");
        return response.json();
    }

    async create(item: T): Promise<T> {
        let defaultOptions = {
            url: "",
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
            },
            dataType: "json",
            body: JSON.stringify(item),
        } as RequestInit;
        let response = await fetch(c.BASE_URL + "/clients/", defaultOptions);
        if (response.status >= 400) {
            let data = await response.json();
            return Promise.reject(data);
        } else {
            let data = response.json();
            return data;
        }
    }

    async update(id: string, item: T) {
        let defaultOptions = {
            url: "",
            method: "PUT",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
            },
            dataType: "json",
            body: JSON.stringify(item),
        } as RequestInit;
        let response = await fetch(
            c.BASE_URL + "/clients/" + id,
            defaultOptions
        );
        if (response.status >= 400) {
            let data = await response.json();
            return Promise.reject(data);
        } else {
            let data = response.json();
            return data;
        }
    }
}
