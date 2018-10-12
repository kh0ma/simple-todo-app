import com.google.common.primitives.Ints;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.utils.StringUtils;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import static org.eclipse.jetty.http.HttpStatus.BAD_REQUEST_400;
import static org.eclipse.jetty.http.HttpStatus.NO_CONTENT_204;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;

/**
 * @author Oleksandr Khomenko > khomenko.dp@gmail.com
 */
public class PostAndRetrieveMessage {
    public static final AtomicInteger MES_INDEX = new AtomicInteger(1);
    private static final Logger LOGGER = LoggerFactory.getLogger(PostAndRetrieveMessage.class);
    private static final String PATH = "/messages";
    private static final Map<Integer, String> MESSAGES = new ConcurrentHashMap<>();
    private static String currentMessage = "Empty yet..";

    public static void apply() {
        getCurrentMessage();
        createMessage();
        queryMessages();
        deleteMessage();
    }

    private static void getCurrentMessage() {
        get(PATH + "/current-message", (req, res) -> currentMessage);
    }

    private static void deleteMessage() {
        delete(PATH + "/:id", (req, res) -> {
            Integer id = Ints.tryParse(req.params("id"));
            if (id != null) {
                MESSAGES.remove(id);
                res.status(NO_CONTENT_204);
                return "";
            } else {
                res.status(BAD_REQUEST_400);
                return "Wrong id";
            }
        });
    }

    private static void queryMessages() {
        get(PATH, (req, res) -> {
            String json = App.OBJECT_MAPPER.toJson(MESSAGES);
            return json;
        });
    }

    private static void createMessage() {
        post(PATH, (req, res) -> {
            String messageReq = req.body();
            LOGGER.info("currentMessage is {}", messageReq);
            if (StringUtils.isNotEmpty(messageReq)) {
                int index = MES_INDEX.getAndIncrement();
                MESSAGES.put(index, messageReq);
                currentMessage = messageReq;
                return App.OBJECT_MAPPER.toJson(Collections.singletonMap(index, messageReq));
            } else {
                res.status(BAD_REQUEST_400);
                return "Message was empty!";
            }
        });
    }
}
