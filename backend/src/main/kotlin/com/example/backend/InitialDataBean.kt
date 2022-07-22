package com.example.backend

import com.example.backend.model.Meal
import com.example.backend.model.PendingState
import com.example.backend.model.Restaurant
import com.example.backend.repository.MealRepository
import com.example.backend.repository.RestaurantRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component

@Component
class InitialDataBean(@Autowired private var environment: Environment) {

    @Value("\${spring.profiles.active}")
    private val springProfile: String? = null

    @Autowired
    lateinit var mealRepository: MealRepository


    @Autowired
    lateinit var restaurantRepository: RestaurantRepository


    @EventListener
    fun onApplicationEvent(event: ContextRefreshedEvent) {
        if (springProfile != "production") {
            if (restaurantRepository.findAll().count() == 0) {
                restaurantRepository.saveAll(
                    listOf(
                        Restaurant(
                            "Bigger Burgers"
                        ),
                        Restaurant(
                            "Big Burgers"
                        ),
                    )
                )

                var meal1 = Meal(
                    "Hamburger",
                    1L
                )
                meal1.pending = PendingState.APPROVED
                var meal2 = Meal(
                    "Cheeseburger",
                    1L
                )
                var meal3 = Meal(
                    "Big Tasty",
                    1L
                )
                meal3.pending = PendingState.APPROVED
                var meal4 = Meal(
                    "Chickenburger",
                    1L
                )
                var meal5 = Meal(
                    "Vegan Burger",
                    1L
                )
                meal5.pending = PendingState.APPROVED
                var meal6 = Meal(
                    "Veggie Burger",
                    1L
                )
                var meal7 = Meal(
                    "Double Cheeseburger",
                    1L
                )
                meal7.pending = PendingState.APPROVED
                var meal8 = Meal(
                    "Double Hamburger",
                    1L
                )

                var meal9 = Meal(
                    "Hamburger",
                    2L
                )
                meal9.pending = PendingState.APPROVED
                var meal10 = Meal(
                    "Cheeseburger",
                    2L
                )
                var meal11 = Meal(
                    "Big Tasty",
                    2L
                )
                meal11.pending = PendingState.APPROVED
                var meal12 = Meal(
                    "Chickenburger",
                    2L
                )
                var meal13 = Meal(
                    "Vegan Burger",
                    2L
                )
                meal13.pending = PendingState.APPROVED
                var meal14 = Meal(
                    "Veggie Burger",
                    2L
                )
                var meal15 = Meal(
                    "Double Cheeseburger",
                    2L
                )
                meal15.pending = PendingState.APPROVED
                var meal16 = Meal(
                    "Double Hamburger",
                    2L
                )


                if (mealRepository.findAll().count() == 0) {
                    mealRepository.saveAll(
                        listOf(
                            meal1,
                            meal2,
                            meal3,
                            meal4,
                            meal5,
                            meal6,
                            meal7,
                            meal8,
                            meal9,
                            meal10,
                            meal11,
                            meal12,
                            meal13,
                            meal14,
                            meal15,
                            meal16
                        )
                    )
                }
            }


        }
    }
}