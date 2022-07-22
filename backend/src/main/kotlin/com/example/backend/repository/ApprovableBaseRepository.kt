package com.example.backend.repository

import com.example.backend.model.ApprovableBaseModel
import com.example.backend.model.PendingState
import org.springframework.data.repository.NoRepositoryBean

@NoRepositoryBean
interface ApprovableBaseRepository<T : ApprovableBaseModel> : BaseRepository<T> {
    fun findByPending(pendingState: PendingState): Iterable<T>
}