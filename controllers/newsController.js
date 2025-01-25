import NewsResponseSchema from "../midedlewares/validator.js";
import NewsResponse from "../models/apiDataModel.js";

export const fetchAllNews = async (req, res) => {
    try {
      const response = await NewsResponse.find();
    res.status(200).json({ success: true, message: "News data fetched successfully.", data: response })
    } catch (error) {
      console.error('Error fetching news responses:', error);
    }
  };

export const addNews = async (req, res) => {
    try {
        const { isValid } = validateNewsResponse(req.body)
        if (isValid) {
            const newsData = new NewsResponse({
                ...req.body
            });
            const result = await newsData.save();
            res.status(200).json({
                success: true, message: "News data added successfully.", result
            })
        } else {
            res.status(400).json({
                success: true, message: "Bad request body"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const validateNewsResponse = (data) => {
const res = NewsResponseSchema.validate(data, { abortEarly: false });
console.log(res)
const { error, value } = res;
if (error) {
    console.error('Validation Error:', error.details);
    return { isValid: false, error: error.details };
}

return { isValid: true, value };
};