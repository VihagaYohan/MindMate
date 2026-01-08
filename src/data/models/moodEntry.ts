import Mood from "./mood";

class MoodEntry extends Mood {
    prediction: string

    constructor(
        id: string,
        userId: string,
        level: string,
        description: string,
        notes: string,
        isActive: boolean,
        createdAt: string,
        updatedAt: string,
        prediction: string
    ) {
        super(id, userId, level, description, notes, isActive, createdAt, updatedAt);
        this.prediction = prediction
    }
}

export default MoodEntry