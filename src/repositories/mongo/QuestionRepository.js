import Question from '../../models/Question.js';

class MongoQuestionRepository {
    async findByDate(dateStr) {
        return await Question.findOne({ date: dateStr }).select('-_id -__v').lean();
    }

    async findById(id) {
        return await Question.findOne({ id }).select('-_id -__v').lean();
    }

    async findAll() {
        return await Question.find().select('-_id -__v').lean();
    }

    async create(data) {
        const question = new Question(data);
        return await question.save();
    }

    async getSolution(id) {
        return await Question.findOne({ id }).select('solution').lean();
    }
}

export default new MongoQuestionRepository();
