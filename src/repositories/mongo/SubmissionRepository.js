import Submission from '../../models/Submission.js';

class MongoSubmissionRepository {
    async create(submissionData) {
        return await Submission.create(submissionData);
    }

    async count(query) {
        return await Submission.countDocuments(query);
    }

    async aggregate(pipeline) {
        return await Submission.aggregate(pipeline);
    }

    // Keep legacy helper for now if needed, or rely on Service to build pipeline
    // The Service refactor will likely move the pipeline building into the Service 
    // and just call repo.aggregate()
}

export default new MongoSubmissionRepository();
