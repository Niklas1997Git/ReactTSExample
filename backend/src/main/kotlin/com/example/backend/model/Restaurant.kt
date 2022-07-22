package com.example.backend.model

import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "restaurant")
class Restaurant(
    var name: String,
) : BaseModel()