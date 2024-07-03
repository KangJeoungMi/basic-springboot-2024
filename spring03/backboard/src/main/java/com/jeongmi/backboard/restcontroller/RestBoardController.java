package com.jeongmi.backboard.restcontroller;

import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jeongmi.backboard.entity.Board;
import com.jeongmi.backboard.dto.BoardDto;
import com.jeongmi.backboard.dto.Header;
import com.jeongmi.backboard.dto.PagingDto;
import com.jeongmi.backboard.dto.ReplyDto;
import com.jeongmi.backboard.entity.Category;
import com.jeongmi.backboard.entity.Reply;
import com.jeongmi.backboard.service.BoardService;
import com.jeongmi.backboard.service.CategoryService;
import com.jeongmi.backboard.service.MemberService;
import com.jeongmi.backboard.validation.ReplyForm;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.*;

@RequiredArgsConstructor
@RequestMapping("/api/board")
@RestController
@Log4j2
public class RestBoardController {
    private final BoardService boardService;
    private final MemberService memberService;
    private final CategoryService categoryService;

    @GetMapping("/list/{category}")
    @ResponseBody
    public Header<List<BoardDto>> list(@PathVariable(value = "category") String category,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "kw", defaultValue = "") String keyword) {

        Category cate = this.categoryService.getCategory(category);

        Page<Board> pages = this.boardService.getList(page, keyword, cate); // 검색 및 카테고리 추가
        // List<Board> list = pages.getContent();
        PagingDto paging = new PagingDto(pages.getTotalElements(), pages.getNumber() + 1, 10, 10);

        List<BoardDto> result = new ArrayList<BoardDto>();
        Long curNum = pages.getTotalElements() - (pages.getNumber() * 10);

        for (Board origin : pages) {
            List<ReplyDto> subList = new ArrayList<>();

            BoardDto bdDto = new BoardDto();

            // 게시글 번호를 추가

            bdDto.setNum(curNum--);
            bdDto.setBno(origin.getBno());
            bdDto.setContent(origin.getContent());
            bdDto.setCreateDate(origin.getCreateDate());
            bdDto.setHit(origin.getHit());
            bdDto.setModifyDate(origin.getModifyDate());
            bdDto.setTitle(origin.getTitle());
            bdDto.setWriter(origin.getWriter() != null ? origin.getWriter().getUsername() : ""); // null 에러
            if (origin.getReplyList().size() > 0) {
                for (Reply reply : origin.getReplyList()) {
                    ReplyDto replyDto = new ReplyDto();
                    replyDto.setRno(reply.getRno());
                    replyDto.setContent(reply.getContent());
                    replyDto.setCreateDate(reply.getCreateDate());
                    replyDto.setModifyDate(reply.getModifyDate());
                    replyDto.setWriter(reply.getWriter() != null ? reply.getWriter().getUsername() : ""); // null에러 가능성

                    subList.add(replyDto);
                }
                bdDto.setReplyList(subList);
            }
            result.add(bdDto);
        }

        log.info(String.format("▶▶▶▶▶ list에서 넘긴 게시글 수: %s", result.size()));
        // model.addAttribute("pages", pages);
        // model.addAttribute("kw", keyword);
        // model.addAttribute("category", category);

        // Header<> 에 담아줌
        Header<List<BoardDto>> last = Header.OK(result, paging);
        return last;
    } 

    @GetMapping("/detail/{bno}")
    public BoardDto detail(@PathVariable("bno") Long bno, HttpServletRequest request) {
      
      String prevUrl = request.getHeader("referer");//이전 페이지 변수 담기
    //   log.info(String.format("현재 이전 페이지: %s", prevUrl));
      // Board board = this.boardService.getBoard(bno);
      Board _board = this.boardService.hitBoard(bno);    // 조회수 증가하고 리턴
      BoardDto board = BoardDto.builder().bno(_board.getBno())
                                         .title(_board.getTitle())
                                         .content(_board.getContent())
                                         .createDate(_board.getCreateDate())
                                         .writer(_board.getWriter() != null ? _board.getWriter().getUsername() : "")
                                         .modifyDate(_board.getModifyDate()).build();
  
      List<ReplyDto> replyList = new ArrayList<>();
      if(_board.getReplyList().size() > 0) {
        _board.getReplyList().forEach(rpy -> replyList.add(ReplyDto.builder()
                                                                    .content(rpy.getContent())
                                                                    .createDate(rpy.getCreateDate()).modifyDate(rpy.getModifyDate())
                                                                    .rno(rpy.getRno())
                                                                    .writer(rpy.getWriter() != null ? rpy.getWriter().getUsername() : "" )
                                                                    .build()));
        
      }
      
  
      board.setReplyList(replyList);
  
      // model.addAttribute("board", board);
      // model.addAttribute("prevUrl", prevUrl); //이전 페이지 URL 뷰에 전달
  
      return board;
  
    }
}
