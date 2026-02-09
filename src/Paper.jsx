import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const paperContent = `
# Fairness-Aware Recommendations for Kazakhstani Video Game Content

**Abstract:** This study develops a fairness-aware recommendation system for YouTube gaming content addressing underrepresentation of Kazakh-language videos and emerging creators. A post-processing re-ranking approach was applied to content-based and collaborative filtering baselines using multiplicative boost factors for Kazakh content (1.25×) and emerging creators (1.25×), with channel diversity penalties. Evaluation on 700 videos from seven channels demonstrated 75% Kazakh representation and 85% emerging creator representation in top-100 recommendations, exceeding fairness targets while maintaining 98% engagement retention. Cross-validation confirmed algorithm stability with coefficient of variation below 0.05 for primary metrics.

**Keywords:** fairness in recommendation systems, provider-side fairness, multilingual content, YouTube recommendations, post-processing re-ranking, Kazakh language content

---

## 1. Introduction

Video recommendation systems play a significant role in content discovery on platforms like YouTube, where algorithmic curation determines which creators gain visibility and audience reach. However, traditional recommendation algorithms often prioritize engagement metrics such as view counts and watch time, leading to systematic underrepresentation of minority-language content and emerging creators with smaller subscriber bases. This creates barriers for local content producers in non-English-speaking regions, where cultural and linguistic diversity remains inadequately supported by existing systems.

In Kazakhstan, gaming content creators face particular challenges in gaining algorithmic exposure. The gaming community operates in a multilingual environment, with content produced in Kazakh, Russian, mixed-language formats, and English. Despite the growing presence of Kazakh-language gaming channels, recommendation algorithms tend to favour established creators with higher engagement metrics, effectively marginalizing emerging voices and underrepresented languages. This bias undermines efforts to promote linguistic diversity and equitable creator opportunities in the digital content ecosystem.

This study develops a fairness-aware recommendation system addressing language-based and creator-size inequities in YouTube gaming content. Post-processing re-ranking methods are applied to content-based and collaborative filtering outputs, with evaluation on 700 videos from seven Kazakhstani channels using exposure parity and engagement retention metrics.

---

## 2. Literature Review

Fairness in recommendation systems has gained attention in recent years, with research examining how algorithmic decisions impact different stakeholder groups [1]. Recent work has formalized the concept of fairness of exposure in rankings, establishing metrics for measuring exposure inequality and motivating subsequent research on provider-side fairness in recommendation contexts.

Post-processing methods have emerged as effective approaches to fairness-aware ranking. The Expohedron framework enables efficient exploration of fairness-utility trade-offs through attention-weighted exposure optimization [2]. This method demonstrates that post-processing interventions can achieve Pareto-optimal solutions without requiring full retraining of underlying recommendation models. Group exposure regulation techniques using MMR-style re-ranking have shown that targeted adjustments to recommendation lists can improve representation of underexposed groups while maintaining overall recommendation quality [3].

Long-tail content promotion represents another important dimension of fairness research. Graph-based approaches have been developed to enhance visibility of niche items and emerging creators in collaborative filtering systems [4]. These methods highlight the challenge of balancing popularity bias with diversity objectives, particularly in domains where user engagement patterns strongly favour established content. Provider-side max-min fairness guarantees have been proposed to protect the interests of worst-off creators through explicit utility bounds [5].

Additional work has addressed fairness in specialized contexts [6-7]. Comprehensive frameworks for measuring multi-sided fairness in recommender systems emphasize the need to consider diverse stakeholder perspectives beyond simple user satisfaction metrics [8]. However, evaluation frameworks for fairness interventions have focused primarily on exposure metrics, with limited consideration of engagement retention as a quality constraint.

The challenge of multilingual content recommendation has received comparatively less attention in the fairness literature [9]. While general recommendation systems research addresses language diversity through cross-lingual embeddings and multilingual models, the specific problem of ensuring fair exposure for low-resource languages in video platforms remains underexplored. Studies of recommendation bias have identified systematic disadvantages for non-English content, but interventions tailored to specific linguistic communities are scarce [10].

This research addresses fairness-aware recommendations for Kazakh-language gaming content in small-corpus settings, with explicit measurement of both exposure parity and engagement retention, which is an approach not previously explored in regional multilingual content ecosystems.

---

## 3. Methodology

### 3.1 Dataset

The study employs a dataset of 700 gaming videos collected from seven Kazakhstani YouTube channels using the YouTube Data API v3. Data collection was conducted between September and October 2025, targeting channels that produce gaming content primarily in Kazakh, Russian, and mixed-language formats. The selection criteria focused on channels with established presence in the Kazakhstan gaming community and regular content production patterns.

Each video entry contains metadata including video identifier, title, description, view count, like count, comment count, subscriber count at collection time, and language label. Language identification was performed through a combination of API-provided metadata and manual verification. Content categories include Let's Play videos, game reviews, tutorial content, and gaming news commentary.

#### Table 1: Dataset Statistics

| Attribute | Value |
|-----------|-------|
| Total videos | 700 |
| Total channels | 7 |
| Kazakh-language videos | 323 (46.1%) |
| Russian-language videos | 302 (43.1%) |
| Mixed-language videos | 60 (8.6%) |
| English-language videos | 15 (2.1%) |
| Average views per video | 143,004 |
| Average engagement rate | 0.0330 |
| Collection period | Sept-Oct 2025 |

Engagement rate is calculated as the ratio of total interactions (likes plus comments) to view count. Subscriber counts range from 215,000 to 1,480,000 across the seven channels, providing diversity in creator size representation.

### 3.2 System Architecture

The recommendation system employs a three-stage pipeline combining content-based filtering, collaborative filtering, and fairness-aware re-ranking. This architecture allows for baseline recommendation generation followed by post-processing fairness interventions without requiring modification of underlying recommendation models.

**Stage 1: Content-Based Filtering**  
Video titles and descriptions are processed using TF-IDF vectorization (100 features, English stop-words removed) to compute cosine similarity scores, enabling language-agnostic content matching.

**Stage 2: Collaborative Filtering**  
Videos are scored by engagement rate, view counts, and recency, capturing behavioural preference signals.

**Stage 3: Fairness-Aware Re-Ranking**  
Fairness interventions apply boost factors of 1.25× for Kazakh content and emerging creators (<600K subscribers), with 0.3× penalties for channel over-representation (>2 videos/channel). Parameters were optimized via grid search across 324 configurations.

### 3.3 Algorithm Pseudocode

\`\`\`
Algorithm: Fairness-Aware Re-Ranking

Input: Videos V, base scores S
Parameters: λ_lang = 1.25, λ_emerg = 1.25,
           τ_sub = 600K, c_limit = 2, p_channel = 0.3

1.  For each video v in V:
2.    score(v) ← S(v)
3.    If language(v) = Kazakh then
4.      score(v) ← score(v) × λ_lang
5.    If subscribers(channel(v)) < τ_sub then
6.      score(v) ← score(v) × λ_emerg
7.  Sort V by score descending
8.  channel_counts ← empty map
9.  For each video v in sorted V:
10.   If channel_counts(channel(v)) ≥ c_limit then
11.     score(v) ← score(v) × p_channel
12.   channel_counts(channel(v)) += 1
13. Re-sort V by updated scores
14. Return top 100 videos from V
\`\`\`

### 3.4 Evaluation Metrics

Performance is assessed along four dimensions: fairness, diversity, coverage, and recommendation quality. This multi-dimensional evaluation framework ensures that fairness improvements do not come at unacceptable cost to user experience or system effectiveness.

#### Table 2: Evaluation Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Kazakh representation (%) | Proportion of Kazakh-language videos in top 100 | >70% |
| Emerging creator representation (%) | Proportion of videos from creators <600K subscribers | >80% |
| Unique channel coverage | Number of distinct channels in top 100 | 7/7 |
| Gini coefficient | Inequality measure of channel distribution | <0.7 |
| Engagement retention (%) | Top 100 average engagement / dataset average engagement | >90% |
| Cross-validation stability | Coefficient of variation across 5 folds | <0.05 |

Baseline comparisons are conducted against three alternative approaches: pure popularity ranking (by view count), engagement-based ranking (by engagement rate), and content-based ranking (by TF-IDF similarity alone). Statistical significance of fairness improvements is assessed through comparison of representation percentages and exposure lift factors relative to dataset baseline distributions.

---

## 4. Results

The fairness-aware recommendation system demonstrated substantial improvements in representation equity compared to baseline approaches. The complete performance comparison across four algorithms is presented in Table 3.

#### Table 3: Algorithm Performance Comparison

| Algorithm | Kazakh % | Emerging % | Channels | Gini | Engagement | Kazakh Lift | Emerging Lift |
|-----------|----------|------------|----------|------|------------|-------------|---------------|
| Popularity (Views) | 29% | 0% | 3/7 | 0.35 | 0.0232 | 0.63× | 0× |
| Engagement Rate | 59% | 76% | 7/7 | 0.61 | 0.0636 | 1.28× | 2.66× |
| Content-Based (TF-IDF) | 51% | 3% | 4/7 | 0.66 | 0.0238 | 1.11× | 0.11× |
| **Fairness-Aware (Ours)** | **75%** | **85%** | **7/7** | **0.67** | **0.0624** | **1.63×** | **2.98×** |

The fairness-aware approach achieved **75% Kazakh-language representation** in the top 100 recommendations, exceeding the target threshold of 70%. This represents a 1.63× lift factor relative to baseline dataset distribution, indicating systematic correction of language-based underrepresentation. Emerging creator representation reached **85%**, substantially exceeding the 80% target and demonstrating effective promotion of channels with subscriber counts below 600,000.

Channel coverage results show that the fairness-aware system successfully included content from all seven channels in the top 100 rankings. This contrasts with popularity-based ranking, which concentrated recommendations among only three high-view count channels, and content-based filtering, which achieved coverage of four channels. The Gini coefficient of 0.67 indicates moderate inequality in exposure distribution, reflecting the balance between fairness constraints and natural variation in content quality.

Engagement retention analysis demonstrates that fairness interventions preserved recommendation relevance. The fairness-aware system achieved an engagement rate of 0.0624, representing **98% retention** compared to the engagement-based baseline (0.0636). This result confirms that fairness adjustments did not substantially compromise user interest signals.

### 4.1 Cross-Validation Analysis

Cross-validation analysis across five dataset folds confirmed the robustness of the fairness-aware approach.

#### Table 4: Cross-Validation Results

| Metric | Mean | Std Dev | CV |
|--------|------|---------|-----|
| Kazakh representation (%) | 70.6% | 0.89% | 0.013 |
| Emerging creator representation (%) | 73.6% | 2.41% | 0.033 |
| TF-IDF similarity score | 0.169 | - | 0.012 |

The coefficient of variation for Kazakh representation was 0.013, well below the 0.05 stability threshold. Emerging creator representation exhibited slightly higher variance (CV = 0.033) but remained within acceptable bounds. These results indicate that fairness outcomes are consistent across different data partitions and not dependent on specific video subsets.

Parameter sensitivity showed 8-9 percentage point variation across configurations, validating grid search optimization.

---

## 5. Discussion

The fairness-aware system increased Kazakh representation by 27% over engagement-based ranking (59%→75%) with only 2% engagement reduction. Compared to content-based filtering, emerging creator representation improved 47% (3%→85%) and channel coverage increased (4/7→7/7). Popularity-based ranking showed zero emerging creator representation, confirming the need for explicit fairness interventions.

The results demonstrate that post-processing re-ranking can effectively address both language-based and creator-size biases in recommendation systems. The multiplicative boost factor approach proved successful in elevating underrepresented content without requiring retraining of base models. The 1.25× boost factors achieved substantial fairness improvements while maintaining high engagement retention, suggesting these parameters strike an effective balance between fairness and quality objectives.

The low cross-validation variance (CV < 0.05) indicates the system's robustness across different data subsets. This stability is particularly important for production deployment, where consistent fairness outcomes are essential for building trust with content creators and maintaining platform credibility.

---

## 6. Conclusion

This study developed a fairness-aware recommendation system for Kazakhstani gaming content, achieving 75% Kazakh representation and 85% emerging creator representation while maintaining 98% engagement retention. Cross-validation confirmed stability (CV <0.05).

The results demonstrate that explicit fairness interventions through multiplicative boost factors and diversity penalties can correct language-based and creator-size biases without substantially compromising recommendation quality. Parameter optimization through grid search proved essential, with fairness outcomes varying by 8-9 percentage points across tested configurations.

### 6.1 Future Work

Future work should extend to:
- Larger corpora with more diverse content categories
- Long-term engagement effects and creator growth metrics
- Adaptive fairness parameters that adjust based on ecosystem dynamics
- User-side fairness considerations and personalization
- Multi-objective optimization frameworks balancing multiple stakeholder interests

---

## References

[1] Biega, A. J., Gummadi, K. P., & Weikum, G. (2018). Equity of attention: Amortizing individual fairness in rankings. *Proceedings of the 41st International ACM SIGIR Conference on Research & Development in Information Retrieval*, 405-414.

[2] Morik, M., Singh, A., Hong, J., & Joachims, T. (2020). Controlling fairness and bias in dynamic learning-to-rank. *Proceedings of the 43rd International ACM SIGIR Conference on Research & Development in Information Retrieval*, 429-438.

[3] Sapiezynski, P., Zeng, W., Robertson, R. E., Mislove, A., & Wilson, C. (2019). Quantifying the impact of user attentiveness on fair ranking. *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems*, 1-14.

[4] Abdollahpouri, H., Burke, R., & Mobasher, B. (2019). Managing popularity bias in recommender systems with personalized re-ranking. *Proceedings of the AAAI Conference on Artificial Intelligence*, 33(01), 413-420.

[5] Yao, S., & Huang, B. (2017). Beyond parity: Fairness objectives for collaborative filtering. *Advances in Neural Information Processing Systems*, 30, 2921-2930.

[6] Burke, R., Sonboli, N., & Ordoñez-Gauger, A. (2018). Balanced neighborhoods for multi-sided fairness in recommendation. *Conference on Fairness, Accountability and Transparency*, 202-214.

[7] Ekstrand, M. D., Tian, M., Azpiazu, I. M., Ekstrand, J. D., Anuyah, O., McNeill, D., & Pera, M. S. (2018). All the cool kids, how do they fit in?: Popularity and demographic biases in recommender evaluation and effectiveness. *Conference on Fairness, Accountability and Transparency*, 172-186.

[8] Mehrotra, R., McInerney, J., Bouchard, H., Lalmas, M., & Diaz, F. (2018). Towards a fair marketplace: Counterfactual evaluation of the trade-off between relevance, fairness & satisfaction in recommendation systems. *Proceedings of the 27th ACM International Conference on Information and Knowledge Management*, 2243-2251.

[9] Ni, J., Li, J., & McAuley, J. (2019). Justifying recommendations using distantly-labeled reviews and fine-grained aspects. *Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing*, 188-197.

[10] Edizel, B., Bonchi, F., Hajian, S., Panisson, A., & Tassa, T. (2020). FaiRecSys: Mitigating algorithmic bias in recommender systems. *International Journal of Data Science and Analytics*, 9(2), 197-213.
`;


function Paper() {
  return (
    <div className="paper-view">
      <div className="paper-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {paperContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Paper;
