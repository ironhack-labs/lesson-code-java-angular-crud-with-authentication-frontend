
export class Project {
  
  constructor(
    private _id: number | null,
    private _title: string,
    private _description: string,
    private _tasks: any[],
    ) { }
    
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get id(): number | null {
    return this._id;
  }
  public set id(value: number | null) {
    this._id = value;
  }
  public get tasks(): any[] {
    return this._tasks;
  }
  public set tasks(value: any[]) {
    this._tasks = value;
  }

  public toJSON(): object {
    return {
        id: this._id,
        title: this._title,
        description: this._description,
        tasks: this._tasks,
    };
  }

}