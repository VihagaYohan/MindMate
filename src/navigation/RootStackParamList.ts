type OnboardingParams = {}

type LoginParams = {}

type RegisterParams = {}

type AppNav = {}

type BottomNavParams = {}

type HomeParams = {}

type MoodParams = {}

type JournalParams = {}

type SettingsParams = {}

type MoodEntryParams = {}

type ResourcesParams = {}

type ResourceDetailsParams = {
  id: string
}

export type RootStackParamList = {
  Onboarding: OnboardingParams,
  Login: LoginParams,
  Register: RegisterParams,
  AppNav: AppNav,
  BottomNav: BottomNavParams,
  Home: HomeParams,
  Mood: MoodParams,
  Journal: JournalParams,
  Settings: SettingsParams,
  MoodEntry: MoodEntryParams,
  Resources: ResourcesParams,
  ResourceDetails: ResourceDetailsParams
}