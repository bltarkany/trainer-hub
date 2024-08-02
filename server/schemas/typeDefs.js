const typeDefs = `
# define the User type
type User {
    _id: ID!
    first_name: String
    last_name: String
    email: String
    isAdmin: Boolean
    role: String
    savedTrainers: [User]
    bodyStats: BodyStats
    programs: [ClientProgram]
    workouts: [Workout]
    isActive: Boolean
}

# define the Trainer type
type Trainer {
    _id: ID!
    first_name: String
    last_name: String
    email: String
    isAdmin: Boolean
    role: String
    trainer_bio: TrainerBio
    isActive: Boolean
}

# define the BodyStats type
type BodyStats {
    weight: Float
    weight_unit: String
    weight_progress: [WeightProgress]
    height: Float
    height_unit: String
    dob: String
    profile_pic: String
    progress_pics: [ProgressPics]
    age: Int
    # can be added for future development
    # body_fat: Float
    # chest: Float
    # waist: Float
    # hips: Float
    # thigh: Float
    # calf: Float
    # bicep: Float
}

# define the WeightProgress type
type WeightProgress {
    weight: Float
    date: String
}

# define the ProgressPics type
type ProgressPics {
    pic: String
    date: String
}

# define the TrainerBio type
type TrainerBio {
    trainer_bio: String
    trainer_image: String
    trainer_specialty: String
    certifications: [String]
}

# define the ClientProgram type
type ClientProgram {
    _id: ID!
    user: User
    program: Program
    start_date: String
    end_date: String
    progress: [Workout]
    completed: Boolean
    completed_date: String
    is_active: Boolean
}

# define the Program type
type Program {
    _id: ID!
    program_name: String
    program_type: String
    program_description: String
    program_duration: String
    program_duration_unit: String
    program_level: String
    program_workouts: [Workout]
    program_creator: Trainer
    program_created: String
    program_updated: String
}

# define the Workout type
type Workout {
    _id: ID!
    title: String
    description: String
    day: String
    week: String
    exercises: [Exercise]
    creator: Trainer
    created: String
    updated: String
}

# define the Exercise type
type Exercise {
    _id: ID!
    exercise: Library
    sets: String
    reps: String
    duration: String
    distance: String
    weight: String
    rest: String
    notes: String
    is_complete: Boolean
    creator: Trainer
}

# define the Library type
type Library {
    _id: ID!
    name: String
    description: String
    category: Category
    muscle: MuscleGroup
    images: [String]
    video: String
    level: String
    creator: Trainer
    created: String
    updated: String
}

# define the Category type
type Category {
    _id: ID!
    name: String
    description: String
}

# define the MuscleGroup type
type MuscleGroup {
    _id: ID!
    muscle_group: String
    muscle_group_image: String
}

type Auth {
    token: ID!
    user: User
}

# define UserInput input
input UserInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    role: String!
    isAdmin: Boolean!
}

# define BodyStatsInput input
input BodyStatsInput {
    weight: Float
    weight_unit: String
    height: Float
    height_unit: String
    dob: String
    profile_pic: String
    progress_pics: [ProgressPicsInput]
}

# define ProgressPicsInput input
input ProgressPicsInput {
    pic: String
    date: String
}

# define LibraryInput input
input LibraryInput {
    name: String!
    description: String!
    category: String!
    muscle: String!
    images: [String]
    video: String
    level: String!
}

# define ProgramInput input
input ProgramInput {
    program_name: String
    program_type: String
    program_description: String
    program_duration: String
    program_duration_unit: String
    program_level: String
    program_workouts: [ID]
}

# define WorkoutInput input
input WorkoutInput {
    title: String
    description: String
    day: String
    week: String
    exercises: [ID]
}

# define ExerciseInput input
input ExerciseInput {
    exercise: ID!
    sets: String
    reps: String
    duration: String
    distance: String
    weight: String
    rest: String
    notes: String
    is_complete: Boolean
}

# define ClientProgramInput input
input ClientProgramInput {
    user: ID!
    program: ID!
    start_date: String
    end_date: String
    progress: [ID]
    completed: Boolean
    completed_date: String
    is_active: Boolean
}
                    
type Query {
    client: User
    clientsByTrainer(trainerId: ID!): [User]
    trainer: Trainer
    trainers: [Trainer]
    programs: [Program]
    program(programId: ID!): Program
    workouts: [Workout]
    workout(workoutId: ID!): Workout
    exercises: [Exercise]
    exercise(exerciseId: ID!): Exercise
    libraries: [Library]
    library(libraryId: ID!): Library
    categories: [Category]
    category(categoryId: ID!): Category
    muscleGroups: [MuscleGroup]
    muscleGroup(muscleGroupId: ID!): MuscleGroup
    clientPrograms: [ClientProgram]
    clientProgram(clientProgramId: ID!): ClientProgram
    clientProgramsByUser(user: ID!): [ClientProgram]
    clientProgramsByProgram(programId: ID!): [ClientProgram]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userData: UserInput!): Auth
    saveTrainer(trainerId: ID!): User
    removeTrainer(trainerId: ID!): User
    addBodyStats(bodyData: BodyStatsInput): User
    updateBodyStats(bodyData: BodyStatsInput): User
    createLibrary(libraryData: LibraryInput): Library
    createProgram(programData: ProgramInput): Program
    createWorkout(workoutData: WorkoutInput): Workout
    createExercise(exerciseData: ExerciseInput): Exercise
    updateExercise( _id: ID!, exerciseData: ExerciseInput): Exercise
    removeExercise(exerciseId: ID!): Exercise
    updateWorkout(_id: ID!, workoutData: WorkoutInput): Workout
    removeWorkout(workoutId: ID!): Workout
    updateProgram(_id: ID!, programData: ProgramInput): Program
    removeProgram(programId: ID!): Program
    updateLibrary(_id: ID!, libraryData: LibraryInput): Library
    removeLibrary(libraryId: ID!): Library
    createCategory(name: String!, description: String): Category
    updateCategory(_id: ID!, name: String, description: String): Category
    removeCategory(categoryId: ID!): Category
    createMuscleGroup(muscle_group: String!, muscle_group_image: String): MuscleGroup
    updateMuscleGroup(_id: ID!, muscle_group: String, muscle_group_image: String): MuscleGroup
    removeMuscleGroup(muscleGroupId: ID!): MuscleGroup
    createClientProgram(clientProgramData: ClientProgramInput): ClientProgram
    updateClientProgram(_id: ID!, clientProgramData: ClientProgramInput): ClientProgram
    removeClientProgram(clientProgramId: ID!): ClientProgram

}
`;
