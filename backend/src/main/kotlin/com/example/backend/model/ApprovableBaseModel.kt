package com.example.backend.model

import javax.persistence.MappedSuperclass

enum class PendingState {
    APPROVED,
    UNAPPROVED,
    TO_EDIT
}

@MappedSuperclass
abstract class ApprovableBaseModel : BaseModel() {
    var pending: PendingState = PendingState.UNAPPROVED
    var reason: String = ""
}