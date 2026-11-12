package com.datalingo.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.datalingo.app.model.Inquisition
import com.datalingo.app.model.Lesson
import com.datalingo.app.model.UserState
import com.datalingo.app.ui.screens.HomeScreen
import com.datalingo.app.ui.screens.InquisitionScreen
import com.datalingo.app.ui.screens.LessonScreen
import com.datalingo.app.ui.theme.DataLingoTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DataLingoTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    var userState by remember { mutableStateOf(UserState()) }
                    var activeLesson by remember { mutableStateOf<Lesson?>(null) }
                    var activeInquisition by remember { mutableStateOf<Inquisition?>(null) }

                    when {
                        activeLesson != null -> {
                            LessonScreen(
                                lesson = activeLesson!!,
                                hearts = userState.hearts,
                                onClose = { activeLesson = null },
                                onCompleteLesson = { earnedXp ->
                                    val currentLessonId = activeLesson!!.id
                                    userState = userState.copy(
                                        xp = userState.xp + earnedXp,
                                        gems = userState.gems + 5,
                                        completedLessons = userState.completedLessons + currentLessonId
                                    )
                                    activeLesson = null
                                },
                                onDeductHeart = {
                                    if (userState.hearts > 0) {
                                        userState = userState.copy(hearts = userState.hearts - 1)
                                    }
                                }
                            )
                        }

                        activeInquisition != null -> {
                            InquisitionScreen(
                                inquisition = activeInquisition!!,
                                onClose = { activeInquisition = null },
                                onCompleteInquisition = { score, passed ->
                                    val inqId = activeInquisition!!.id
                                    if (passed) {
                                        userState = userState.copy(
                                            xp = userState.xp + activeInquisition!!.xpReward,
                                            gems = userState.gems + activeInquisition!!.gemReward,
                                            completedInquisitions = userState.completedInquisitions + (inqId to score),
                                            earnedBadges = userState.earnedBadges + activeInquisition!!.badgeTitle
                                        )
                                    }
                                    activeInquisition = null
                                }
                            )
                        }

                        else -> {
                            HomeScreen(
                                userState = userState,
                                onSelectTrack = { newTrack ->
                                    userState = userState.copy(currentTrack = newTrack)
                                },
                                onStartLesson = { lesson ->
                                    activeLesson = lesson
                                },
                                onStartInquisition = { inq ->
                                    activeInquisition = inq
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}

