package com.example.backend.controller

import com.example.backend.model.Meal
import com.example.backend.repository.MealRepository
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/meals")
class MealController(override val repository: MealRepository) : ApprovableRestController<Meal>()
