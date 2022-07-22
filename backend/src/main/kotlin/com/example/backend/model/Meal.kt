package com.example.backend.model

import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "meal")
/**
 * Meal, that can be delivered by a restaurant
 */
class Meal(
    var name: String,

    var restaurant: Long = -1L
) : ApprovableBaseModel()