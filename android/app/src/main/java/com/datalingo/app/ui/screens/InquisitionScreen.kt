package com.datalingo.app.ui.screens

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.datalingo.app.model.Inquisition
import com.datalingo.app.ui.components.DuoButton
import com.datalingo.app.ui.theme.*
import kotlinx.coroutines.delay

@Composable
fun InquisitionScreen(
    inquisition: Inquisition,
    onClose: () -> Unit,
    onCompleteInquisition: (Int, Boolean) -> Unit
) {
    var stage by remember { mutableStateOf("BATTLE") } // BATTLE, VERDICT
    var timeLeft by remember { mutableStateOf(inquisition.timeLimitSeconds) }
    var currentQuestionIndex by remember { mutableStateOf(0) }
    var correctCount by remember { mutableStateOf(0) }
    var selectedOption by remember { mutableStateOf<Int?>(null) }

    // Countdown Timer
    LaunchedEffect(stage) {
        if (stage == "BATTLE") {
            while (timeLeft > 0) {
                delay(1000L)
                timeLeft--
            }
            stage = "VERDICT"
        }
    }

    val currentQuestion = inquisition.questions.getOrNull(currentQuestionIndex)

    if (stage == "VERDICT" || currentQuestion == null) {
        val totalQuestions = inquisition.questions.size
        val scorePercent = if (totalQuestions > 0) (correctCount * 100) / totalQuestions else 0
        val isPassed = scorePercent >= inquisition.minimumPassPercent

        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF0F172A))
                .padding(24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = if (isPassed) "🏆" else "💀", fontSize = 64.sp)
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = if (isPassed) "INQUISITION CONQUERED!" else "INQUISITION FAILED",
                fontSize = 24.sp,
                fontWeight = FontWeight.Black,
                color = if (isPassed) DuoYellow else DuoRed
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = if (isPassed) {
                    "Score: $scorePercent% (Passed >= ${inquisition.minimumPassPercent}%)\nUnlocked ${inquisition.badgeTitle} Master Badge!"
                } else {
                    "Score: $scorePercent% (Needed >= ${inquisition.minimumPassPercent}%)\nReview the syllabus and challenge again."
                },
                fontSize = 14.sp,
                color = Color.White.copy(alpha = 0.9f),
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(32.dp))
            DuoButton(
                text = if (isPassed) "CLAIM REWARDS" else "RETURN TO MAP",
                backgroundColor = if (isPassed) DuoGreen else DuoRed,
                shadowColor = if (isPassed) DuoGreenDark else DuoRedDark,
                onClick = { onCompleteInquisition(scorePercent, isPassed) },
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
                    .background(Color(0xFF0F172A))
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                IconButton(onClick = onClose) {
                    Icon(Icons.Default.Close, contentDescription = "Close", tint = Color.White)
                }

                Text(
                    text = "⚔️ BOSS INQUISITION",
                    color = DuoRed,
                    fontWeight = FontWeight.Black,
                    fontSize = 14.sp,
                    letterSpacing = 1.sp
                )

                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFF1E293B))
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = "⏱️ ${timeLeft}s",
                        color = DuoYellow,
                        fontWeight = FontWeight.Black,
                        fontSize = 14.sp
                    )
                }
            }
        },
        bottomBar = {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFF0F172A))
                    .padding(16.dp)
            ) {
                DuoButton(
                    text = if (currentQuestionIndex + 1 == inquisition.questions.size) "SUBMIT INQUISITION" else "LOCK ANSWER",
                    enabled = selectedOption != null,
                    backgroundColor = DuoRed,
                    shadowColor = DuoRedDark,
                    onClick = {
                        if (selectedOption == currentQuestion.correctIndex) {
                            correctCount++
                        }
                        selectedOption = null
                        if (currentQuestionIndex + 1 < inquisition.questions.size) {
                            currentQuestionIndex++
                        } else {
                            stage = "VERDICT"
                        }
                    },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF0F172A))
                .padding(innerPadding)
                .padding(20.dp)
        ) {
            Text(
                text = currentQuestion.prompt,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black,
                color = Color.White,
                lineHeight = 28.sp
            )

            Spacer(modifier = Modifier.height(24.dp))

            currentQuestion.options.forEachIndexed { index, option ->
                val isSelected = selectedOption == index

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .border(
                            width = 2.dp,
                            color = if (isSelected) DuoRed else Color(0xFF334155),
                            shape = RoundedCornerShape(16.dp)
                        )
                        .background(if (isSelected) Color(0xFF3B1219) else Color(0xFF1E293B))
                        .clickable { selectedOption = index }
                        .padding(16.dp)
                ) {
                    Text(
                        text = option,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp,
                        color = Color.White
                    )
                }
            }
        }
    }
}

