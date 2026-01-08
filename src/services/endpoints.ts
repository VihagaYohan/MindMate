class Endpoint {
  baseUrl: string;
  login: string;
  register: string;
  categories: string;
  profile: string;
  moods: string;
  resources: string;
  moodEntry: string;
  moodStats: string;

  constructor() {
    this.baseUrl = 'http://192.168.1.137:3000/api/v1/';
    this.login = `${this.baseUrl}auth/login`;
    this.register = `${this.baseUrl}auth`;
    this.categories = `${this.baseUrl}categories`;
    this.profile = `${this.baseUrl}profiles/by-user`;
    this.moods = `${this.baseUrl}user-moods`;
    this.resources = `${this.baseUrl}resources`;
    this.moodEntry = `${this.baseUrl}user-moods`;
    this.moodStats = `${this.moodEntry}/stats`;
  }
}

export default Endpoint;
