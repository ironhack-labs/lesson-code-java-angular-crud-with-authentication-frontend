export class Task {
    
    constructor(
      private _id: number | null,
      private _title: string,
      private _description: string,
      private _projectId: number | null,
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
    public get projectId(): number | null {
        return this._projectId;
    }
    public set projectId(value: number | null) {
        this._projectId = value;
    }
  
    public toJSON(): object {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            projectId: this._projectId,
        };
    }
  
  }