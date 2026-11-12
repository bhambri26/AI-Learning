// xcode: set sdk=iOS

import SwiftUI

struct NativeDataLingoView: View {
    @State private var streak: Int = 3
    @State private var hearts: Int = 5
    @State private var gems: Int = 150
    @State private var currentTrack: String = "Python AI Core"

    var body: some View {
        NavigationView {
            ZStack {
                Color.white.edgesIgnoringSafeArea(.all)

                VStack(spacing: 20) {
                    // Top HUD
                    HStack {
                        // Track Title
                        HStack(spacing: 6) {
                            Text("🐍")
                            Text(currentTrack)
                                .font(.system(size: 14, weight: .black))
                        }
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(Color(UIColor.systemGray6))
                        .cornerRadius(12)

                        Spacer()

                        // Streak
                        HStack(spacing: 4) {
                            Text("🔥")
                            Text("\(streak)")
                                .font(.system(size: 14, weight: .black))
                                .foregroundColor(.orange)
                        }

                        // Gems
                        HStack(spacing: 4) {
                            Text("💎")
                            Text("\(gems)")
                                .font(.system(size: 14, weight: .black))
                                .foregroundColor(.blue)
                        }

                        // Hearts
                        HStack(spacing: 4) {
                            Text("❤️")
                            Text("\(hearts)")
                                .font(.system(size: 14, weight: .black))
                                .foregroundColor(.red)
                        }
                    }
                    .padding(.horizontal)

                    // Unit Banner
                    VStack(spacing: 6) {
                        Text("UNIT 1")
                            .font(.system(size: 11, weight: .black))
                            .foregroundColor(.white.opacity(0.8))
                        Text("Python Core & Vectorized Foundations")
                            .font(.system(size: 18, weight: .black))
                            .foregroundColor(.white)
                            .multilineTextAlignment(.center)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 18)
                    .background(Color(red: 0.35, green: 0.80, blue: 0.01))
                    .cornerRadius(20)
                    .padding(.horizontal)

                    Spacer()

                    // Duolingo 3D Button
                    Button(action: {
                        // Action
                    }) {
                        Text("COMMENCE INQUISITION")
                            .font(.system(size: 15, weight: .black))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 52)
                            .background(Color(red: 1.0, green: 0.29, blue: 0.29))
                            .cornerRadius(16)
                            .shadow(color: Color(red: 0.92, green: 0.17, blue: 0.17), radius: 0, x: 0, y: 4)
                    }
                    .padding(.horizontal, 24)
                    .padding(.bottom, 20)
                }
            }
            .navigationBarHidden(true)
        }
    }
}

