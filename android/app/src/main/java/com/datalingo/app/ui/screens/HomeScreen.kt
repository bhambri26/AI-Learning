package com.datalingo.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
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
import com.datalingo.app.model.*
import com.datalingo.app.repository.CurriculumRepository
import com.datalingo.app.ui.components.DuoButton
import com.datalingo.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    userState: UserState,
    onSelectTrack: (TrackType) -> Unit,
    onStartLesson: (Lesson) -> Unit,
    onStartInquisition: (Inquisition) -> Unit
) {
    var showTrackDialog by remember { mutableStateOf(false) }
    var selectedLessonForDialog by remember { mutableStateOf<Lesson?>(null) }
    var selectedInquisitionForDialog by remember { mutableStateOf<Inquisition?>(null) }

    val currentUnit = remember(userState.currentTrack) {
        CurriculumRepository.getUnitForTrack(userState.currentTrack)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color(0xFFF3F4F6))
                            .clickable { showTrackDialog = true }
                            .padding(horizontal = 10.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Text(text = userState.currentTrack.icon, fontSize = 18.sp)
                        Text(
                            text = userState.currentTrack.title,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Black,
                            color = Color(0xFF1F2937)
                        )
                        Icon(
                            imageVector = Icons.Default.ArrowDropDown,
                            contentDescription = null,
                            tint = Color.Gray,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                },
                actions = {
                    // Streak
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(end = 12.dp)
                    ) {
                        Text(text = "🔥", fontSize = 16.sp)
                        Text(
                            text = "${userState.streak}",
                            fontWeight = FontWeight.Black,
                            color = Color(0xFFF59E0B),
                            fontSize = 14.sp
                        )
                    }

                    // Gems
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(end = 12.dp)
                    ) {
                        Text(text = "💎", fontSize = 16.sp)
                        Text(
                            text = "${userState.gems}",
                            fontWeight = FontWeight.Black,
                            color = DuoBlue,
                            fontSize = 14.sp
                        )
                    }

                    // Hearts
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(end = 12.dp)
                    ) {
                        Text(text = "❤️", fontSize = 16.sp)
                        Text(
                            text = "${userState.hearts}",
                            fontWeight = FontWeight.Black,
                            color = DuoRed,
                            fontSize = 14.sp
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color.White),
            horizontalAlignment = Alignment.CenterHorizontally,
            contentPadding = PaddingValues(16.dp)
        ) {
            // Unit Banner
            item {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 24.dp),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = DuoGreen)
                ) {
                    Column(
                        modifier = Modifier.padding(20.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "UNIT ${currentUnit.unitNumber}",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Black,
                            color = Color.White.copy(alpha = 0.8f),
                            letterSpacing = 1.sp
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = currentUnit.title,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Black,
                            color = Color.White,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = currentUnit.description,
                            fontSize = 13.sp,
                            color = Color.White.copy(alpha = 0.9f),
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }

            // Path Nodes (Winding road pattern)
            val offsets = listOf(0.dp, (-40).dp, 40.dp, (-30).dp, 30.dp, 0.dp)

            itemsIndexed(currentUnit.lessons) { index, lesson ->
                val isCompleted = userState.completedLessons.contains(lesson.id)
                val isUnlocked = index == 0 || userState.completedLessons.contains(currentUnit.lessons[index - 1].id)
                val xOffset = offsets[index % offsets.size]

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Box(modifier = Modifier.offset(x = xOffset)) {
                        // Lesson Node Button
                        Box(
                            modifier = Modifier
                                .size(74.dp)
                                .clip(CircleShape)
                                .background(
                                    when {
                                        isCompleted -> DuoYellowDark
                                        isUnlocked -> DuoGreenDark
                                        else -> Color(0xFFD1D5DB)
                                    }
                                )
                                .clickable(enabled = isUnlocked) {
                                    selectedLessonForDialog = lesson
                                },
                            contentAlignment = Alignment.Center
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(70.dp)
                                    .clip(CircleShape)
                                    .background(
                                        when {
                                            isCompleted -> DuoYellow
                                            isUnlocked -> DuoGreen
                                            else -> Color(0xFFE5E7EB)
                                        }
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                if (isCompleted) {
                                    Icon(Icons.Default.Check, contentDescription = null, tint = Color.White, modifier = Modifier.size(36.dp))
                                } else if (isUnlocked) {
                                    Icon(Icons.Default.Star, contentDescription = null, tint = Color.White, modifier = Modifier.size(34.dp))
                                } else {
                                    Icon(Icons.Default.Lock, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(28.dp))
                                }
                            }
                        }
                    }
                }
            }

            // Boss Inquisition Node
            item {
                val inquisition = currentUnit.inquisition
                val isPassed = userState.completedInquisitions.containsKey(inquisition.id)
                val isUnlocked = currentUnit.lessons.all { userState.completedLessons.contains(it.id) }

                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 20.dp, bottom = 40.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .size(86.dp)
                            .clip(CircleShape)
                            .background(
                                when {
                                    isPassed -> DuoPurpleDark
                                    isUnlocked -> DuoRedDark
                                    else -> Color(0xFFD1D5DB)
                                }
                            )
                            .clickable(enabled = isUnlocked) {
                                selectedInquisitionForDialog = inquisition
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .size(80.dp)
                                .clip(CircleShape)
                                .background(
                                    when {
                                        isPassed -> DuoPurple
                                        isUnlocked -> DuoRed
                                        else -> Color(0xFFE5E7EB)
                                    }
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            if (isPassed) {
                                Text(text = "🏆", fontSize = 36.sp)
                            } else if (isUnlocked) {
                                Text(text = "⚔️", fontSize = 34.sp)
                            } else {
                                Icon(Icons.Default.Lock, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(32.dp))
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "UNIT INQUISITION",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Black,
                        color = if (isUnlocked) DuoRed else Color.Gray,
                        letterSpacing = 1.sp
                    )
                }
            }
        }
    }

    // Lesson Details Popup Dialog
    selectedLessonForDialog?.let { lesson ->
        AlertDialog(
            onDismissRequest = { selectedLessonForDialog = null },
            icon = { Text(text = "📖", fontSize = 38.sp) },
            title = { Text(text = lesson.title, fontWeight = FontWeight.Black, textAlign = TextAlign.Center) },
            text = { Text(text = lesson.description, fontSize = 14.sp, color = Color.Gray, textAlign = TextAlign.Center) },
            confirmButton = {
                DuoButton(
                    text = "START LESSON",
                    onClick = {
                        val target = selectedLessonForDialog
                        selectedLessonForDialog = null
                        target?.let { onStartLesson(it) }
                    },
                    modifier = Modifier.fillMaxWidth()
                )
            },
            dismissButton = {
                TextButton(
                    onClick = { selectedLessonForDialog = null },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(text = "CLOSE", color = Color.Gray, fontWeight = FontWeight.Bold)
                }
            }
        )
    }

    // Inquisition Details Popup Dialog
    selectedInquisitionForDialog?.let { inq ->
        AlertDialog(
            onDismissRequest = { selectedInquisitionForDialog = null },
            icon = { Text(text = "⚔️", fontSize = 42.sp) },
            title = { Text(text = inq.title, fontWeight = FontWeight.Black, textAlign = TextAlign.Center) },
            text = {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = inq.scenario, fontSize = 13.sp, color = Color.Gray, textAlign = TextAlign.Center)
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "Time Limit: ${inq.timeLimitSeconds}s • Reward: +${inq.xpReward} XP",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = DuoPurple
                    )
                }
            },
            confirmButton = {
                DuoButton(
                    text = "COMMENCE BOSS BATTLE",
                    backgroundColor = DuoRed,
                    shadowColor = DuoRedDark,
                    onClick = {
                        val target = selectedInquisitionForDialog
                        selectedInquisitionForDialog = null
                        target?.let { onStartInquisition(it) }
                    },
                    modifier = Modifier.fillMaxWidth()
                )
            },
            dismissButton = {
                TextButton(
                    onClick = { selectedInquisitionForDialog = null },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(text = "CLOSE", color = Color.Gray, fontWeight = FontWeight.Bold)
                }
            }
        )
    }

    // Track Selection Dialog
    if (showTrackDialog) {
        AlertDialog(
            onDismissRequest = { showTrackDialog = false },
            title = { Text(text = "Select Learning Track", fontWeight = FontWeight.Black) },
            text = {
                Column(modifier = Modifier.fillMaxWidth()) {
                    TrackType.values().forEach { track ->
                        val isSelected = track == userState.currentTrack
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(if (isSelected) DuoGreenLight else Color.Transparent)
                                .clickable {
                                    onSelectTrack(track)
                                    showTrackDialog = false
                                }
                                .padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = track.icon, fontSize = 24.sp)
                            Spacer(modifier = Modifier.width(12.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = track.title,
                                    fontWeight = FontWeight.Black,
                                    fontSize = 14.sp,
                                    color = Color(0xFF1F2937)
                                )
                                Text(
                                    text = track.tagline,
                                    fontSize = 11.sp,
                                    color = Color.Gray
                                )
                            }
                            if (isSelected) {
                                Icon(Icons.Default.Check, contentDescription = null, tint = DuoGreen)
                            }
                        }
                    }
                }
            },
            confirmButton = {}
        )
    }
}

