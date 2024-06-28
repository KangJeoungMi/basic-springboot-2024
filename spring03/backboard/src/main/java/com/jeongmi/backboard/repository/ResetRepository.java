package com.jeongmi.backboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jeongmi.backboard.entity.Reset;
import java.util.Optional;

public interface ResetRepository extends JpaRepository<Reset, Integer>{
    Optional<Reset> findByUuid(String uuid); // UUID 로 테이블 생성
}
