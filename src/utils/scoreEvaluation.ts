interface ScoreEvaluation {
  rank: string;
  description: string;
  color: string;
}

export const getScoreEvaluation = (score: number): ScoreEvaluation => {
  if (score >= 50) {
    return {
      rank: "達人",
      description: "あなたは生まれながらのモグラ叩き名人です！",
      color: "text-yellow-400"
    };
  } else if (score >= 30) {
    return {
      rank: "プロ級",
      description: "かなり上手くなってきましたね！",
      color: "text-purple-400"
    };
  } else if (score >= 15) {
    return {
      rank: "中級者",
      description: "着実に上達しています！",
      color: "text-blue-400"
    };
  } else {
    return {
      rank: "見習い",
      description: "これからも練習を重ねましょう！",
      color: "text-green-400"
    };
  }
};