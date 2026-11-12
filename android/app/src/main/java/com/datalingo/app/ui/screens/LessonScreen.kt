package com.datalingo.app.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.datalingo.app.model.Lesson
import com.datalingo.app.ui.components.DuoButton
import com.datalingo.app.ui.theme.*

@Composable
fun LessonScreen(
    lesson: Lesson,
    hearts: Int,
    onClose: () -> Unit,
    onCompleteLesson: (Int) -> Unit,
    onDeductHeart: () -> Unit
) {
    var currentIndex by remember { mutableStateOf(0) }
    var selectedOptionIndex by remember { mutableStateOf<Int?>(null) }
    var answerStatus by remember { mutableStateOf<AnswerStatus>(AnswerStatus.ANSWERING) }

    val currentQuestion = lesson.questions.getOrNull(currentIndex)
    val progress = (currentIndex.toFloat() / lesson.questions.size.toFloat())

    if (currentQuestion == null) {
        // Lesson Finished Screen
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
                .padding(24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = "🎉", fontSize = 64.sp)
            Spacer(modifier = Modifier.height(16.dp))
            Text(text = "Lesson Mastered!", fontSize = 28.sp, fontWeight = FontWeight.Black, color = DuoGreen)
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "You earned +${lesson.xpReward} XP and leveled up your skills!",
                fontSize = 15.sp,
                color = Color.Gray
            )
            Spacer(modifier = Modifier.height(32.dp))
            DuoButton(
                text = "CONTINUE TO MAP",
                onClick = { onCompleteLesson(lesson.xpReward) },
                modifier = Modifier.fillMaxWidth()
            )
        }
        return
    }

    Scaffold(
        topBar = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onClose) {
                    Icon(Icons.Default.Close, contentDescription = "Close", tint = Color.Gray)
                }

                LinearProgressIndicator(
                    progress = { progress },
                    modifier = Modifier
                        .weight(1f)
                        .height(12.dp)
                        .clip(RoundedCornerShape(6.dp)),
                    color = DuoGreen,
                    trackColor = Color(0xFFE5E7EB)
                )

                Spacer(modifier = Modifier.width(12.dp))

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "❤️", fontSize = 16.sp)
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "$hearts",
                        fontWeight = FontWeight.Black,
                        color = DuoRed,
                        fontSize = 15.sp
                    )
                }
            }
        },
        bottomBar = {
            // Sliding Feedback Banner
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        when (answerStatus) {
                            AnswerStatus.CORRECT -> DuoGreenLight
                            AnswerStatus.WRONG -> DuoRedLight
                            AnswerStatus.ANSWERING -> Color.White
                        }
                    )
                    .border(
                        width = 1.dp,
                        color = when (answerStatus) {
                            AnswerStatus.CORRECT -> DuoGreen
                            AnswerStatus.WRONG -> DuoRed
                            AnswerStatus.ANSWERING -> Color(0xFFE5E7EB)
                        }
                    )
                    .padding(16.dp)
            ) {
                Column {
                    if (answerStatus == AnswerStatus.CORRECT) {
                        Text(
                            text = "Nicely done!",
                            fontWeight = FontWeight.Black,
                            fontSize = 18.sp,
                            color = DuoGreenDark
                        )
                        Text(
                            text = currentQuestion.explanation,
                            fontSize = 13.sp,
                            color = Color(0xFF1F2937),
                            modifier = Modifier.padding(vertical = 4.dp)
                        )
                    } else if (answerStatus == AnswerStatus.WRONG) {
                        Text(
                            text = "Incorrect",
                            fontWeight = FontWeight.Black,
                            fontSize = 18.sp,
                            color = DuoRedDark
                        )
                        Text(
                            text = currentQuestion.explanation,
                            fontSize = 13.sp,
                            color = Color(0xFF1F2937),
                            modifier = Modifier.padding(vertical = 4.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    if (answerStatus == AnswerStatus.ANSWERING) {
                        DuoButton(
                            text = "CHECK",
                            enabled = selectedOptionIndex != null,
                            onClick = {
                                if (selectedOptionIndex == currentQuestion.correctIndex) {
                                    answerStatus = AnswerStatus.CORRECT
                                } else {
                                    answerStatus = AnswerStatus.WRONG
                                    onDeductHeart()
                                }
                            },
                            modifier = Modifier.fillMaxWidth()
                        )
                    } else {
                        DuoButton(
                            text = "CONTINUE",
                            backgroundColor = if (answerStatus == AnswerStatus.CORRECT) DuoGreen else DuoRed,
                            shadowColor = if (answerStatus == AnswerStatus.CORRECT) DuoGreenDark else DuoRedDark,
                            onClick = {
                                selectedOptionIndex = null
                                answerStatus = AnswerStatus.ANSWERING
                                currentIndex++
                            },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(20.dp)
        ) {
            Text(
                text = currentQuestion.prompt,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black,
                color = Color(0xFF1F2937),
                lineHeight = 28.sp
            )

            currentQuestion.codeSnippet?.let { snippet ->
                Spacer(modifier = Modifier.height(12.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color(0xFF1E293B))
                        .padding(14.dp)
                ) {
                    Text(
                        text = snippet,
                        color = Color(0xFFE2E8F0),
                        fontFamily = FontFamily.Monospace,
                        fontSize = 13.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            currentQuestion.options.forEachIndexed { index, option ->
                val isSelected = selectedOptionIndex == index
                val letter = ('A'.code + index).toChar().toString()

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .border(
                            width = 2.dp,
                            color = if (isSelected) DuoBlue else Color(0xFFE5E7EB),
                            shape = RoundedCornerShape(16.dp)
                        )
                        .background(if (isSelected) DuoBlueLight else Color.White)
                        .clickable(enabled = answerStatus == AnswerStatus.ANSWERING) {
                            selectedOptionIndex = index
                        }
                        .padding(16.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(30.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .border(
                                    width = 1.dp,
                                    color = if (isSelected) DuoBlue else Color.Gray,
                                    shape = RoundedCornerShape(8.dp)
                                )
                                .background(if (isSelected) DuoBlue else Color.Transparent),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = letter,
                                fontWeight = FontWeight.Black,
                                fontSize = 13.sp,
                                color = if (isSelected) Color.White else Color.Gray
                            )
                        }

                        Spacer(modifier = Modifier.width(14.dp))

                        Text(
                            text = option,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp,
                            color = Color(0xFF1F2937),
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }
    }
}

enum class AnswerStatus {
    ANSWERING, CORRECT, WRONG
}

