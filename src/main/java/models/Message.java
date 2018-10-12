package models;

import lombok.Builder;
import lombok.Data;

/**
 * @author Oleksandr Khomenko > khomenko.dp@gmail.com
 */

@Data
@Builder
public class Message {
    private Integer id;
    private String message;
}
