package com.jeongmi.backboard.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
  private Long bno;
  private String title; 
  private String content; 
  private LocalDateTime createDate;
  private LocalDateTime modifyDate;
  private Integer hit;
  private String writer;
  private List<ReplyDto> replyList;

}
