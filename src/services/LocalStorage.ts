interface StorageInterface<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: string): Promise<void>;
}

import { v4 as uuidv4 } from "uuid";

export class LocalStorage<T extends { id: string }> implements StorageInterface<T> {
  constructor(private storageKey: string) {}

  async getAll(): Promise<T[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async getById(id: string): Promise<T | null> {
    const items = await this.getAll();
    return items.find(item => item.id === id) || null;
  }

  async create(item: Omit<T, "id">): Promise<T> {
    const items = await this.getAll();
    const newItem = { 
      ...item, 
      id: uuidv4()
    } as T;
    items.push(newItem);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return newItem;
  }

  async update(updatedItem: T): Promise<T> {
    let items = await this.getAll();
    items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    const items = (await this.getAll()).filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}