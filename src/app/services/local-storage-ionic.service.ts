import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageIonicService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Save data
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Get data
  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // Remove data
  public remove(key: string) {
    this._storage?.remove(key);
  }

  // Get all keys
  public async getAllKeys(): Promise<string[]> {
    return (await this._storage?.keys()) ?? [];
  }

  // Get all data
  public async getAllData(): Promise<any[]> {
    const keys = await this.getAllKeys();
    const data = [];
    for (const key of keys) {
      const value = await this.get(key);
      data.push({ key, value });
    }
    return data;
  }
}