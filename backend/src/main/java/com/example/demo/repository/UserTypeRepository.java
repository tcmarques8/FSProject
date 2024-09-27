package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserType;

@Repository
public interface UserTypeRepository extends CrudRepository<UserType, Integer> {

}
