package com.jeongmi.backboard.dto;

import java.time.LocalDateTime;

import com.jeongmi.backboard.entity.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReplyDto {
    private Long rno;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private Board board;
    private String writer; 
    private String content;
}
