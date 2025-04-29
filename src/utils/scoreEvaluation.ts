interface ScoreEvaluation {
  rank: string;
  description: string;
  color: string;
}

export const getScoreEvaluation = (score: number): ScoreEvaluation => {
  if (score >= 50) {
    return {
      rank: "Whack Master",
      description: "You're a natural mole whacker!",
      color: "text-yellow-400"
    };
  } else if (score >= 30) {
    return {
      rank: "Pro Whacker",
      description: "Getting really good at this!",
      color: "text-purple-400"
    };
  } else if (score >= 15) {
    return {
      rank: "Mole Hunter",
      description: "You're making progress!",
      color: "text-blue-400"
    };
  } else {
    return {
      rank: "Novice",
      description: "Keep practicing!",
      color: "text-green-400"
    };
  }
};