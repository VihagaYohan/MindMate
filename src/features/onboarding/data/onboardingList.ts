import OnboardingItem from '../model/OnboardingItem'

import Happy from '../../../assets/images/happy.svg'
import Meditation from '../../../assets/images/meditation.svg'
import Support from '../../../assets/images/support.svg'

const OnboardingList: OnboardingItem[] = [
    new OnboardingItem(
      Happy,
      "Understand How You Feel",
      "Monitor your mood, reflect on your emotions, and see your growth over time with helpful insights"),

   new OnboardingItem(
     Meditation,
     "You're Not Alone",
     "We're here for you, every step of the way. Let's start building healthier habits together!"
   ),

    new OnboardingItem(
      Support,
      "Support Tailored Just For You",
      "Get advice and resources based on your unique challenges - from homesickness to academic pressure and everything in between"
    )
]

export default OnboardingList