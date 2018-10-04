import spark.utils.StringUtils;

import static spark.Spark.get;
import static spark.Spark.post;

/**
 * @author Oleksandr Khomenko > khomenko.dp@gmail.com
 */
public class PostAndRetriveMessage {
    private static final String PATH = "/message";

    private static String message = "Empty yet..";

    public static void apply() {
        get(PATH, (req, res) -> message);

        post(PATH, (req, res)-> {
            String messageReq = req.body();
            if(StringUtils.isNotEmpty(messageReq)) {
                message = messageReq;
                return message;
            } else {
                res.status(400);
                return "Message was empty!";
            }
        });
    }
}
